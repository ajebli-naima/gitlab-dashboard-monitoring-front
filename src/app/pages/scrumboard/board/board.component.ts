import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {fuseAnimations} from '@fuse/animations';
import {ScrumboardService} from '../scrumboard.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Board} from '../board.model';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
    selector: 'scrumboard-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ScrumboardBoardComponent implements OnInit, OnDestroy {

    userFile;
    thumbnail: any;

    reg = '(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+' +
        '[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+' +
        '[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.' +
        '|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})';
    edit = false;

    board: Board;

    form: FormGroup;

    constructor(
        private sanitizer: DomSanitizer,
        private _activatedRoute: ActivatedRoute,
        private _scrumboardService: ScrumboardService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute, private router: Router
    ) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = params.get('boardId');

            if (id === 'new') {
                this.edit = true;
                this.board = new Board();
                this.constructorForm();
            } else {
                this._scrumboardService.getApplication(id).subscribe(application => {
                    this.board = application;
                    const objectURL = 'data:image/jpeg;base64,' + application.photo;
                    this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                });
            }
        });
    }

    ngOnDestroy(): void {
    }


    toogleMode(): void {
        this.edit = true;
        this.constructorForm();
    }

    save(): void {
        const id = this.board.id;
        this.board = this.form.value;
        this.board.id = id;

        this._scrumboardService.uploadPictureApplication(this.form.value, this.userFile).subscribe(data => {
            this.router.navigate(['/boards']);
        });
    }

    constructorForm(): void {
        this.form = this.formBuilder.group({
            nameApplication: [this.board.nameApplication,
                [Validators.required]],
            urlGitlab: [this.board.urlGitlab, [Validators.required, Validators.pattern(this.reg)]],
            urlJenkins: [this.board.urlJenkins, [Validators.pattern(this.reg)]],
            urlSonar: [this.board.urlSonar, Validators.pattern(this.reg)],
            urlGrafana: [this.board.urlGrafana, Validators.pattern(this.reg)],
            urlGraylog: [this.board.urlGraylog, Validators.pattern(this.reg)],
            urlDeployment: [this.board.urlDeployment, Validators.pattern(this.reg)],
        });
    }

    onFileChanged($event: Event): void {
        if ($event.target['files'].length > 0) {
            const file = event.target['files'][0];
            this.userFile = file;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (_event) => {
                this.thumbnail = reader.result;
            };
        }
    }

    cancel(): void {
        if (this.board.id) {
            this.edit = false;
        } else {
            this.router.navigate(['/boards']);
        }
    }
}
