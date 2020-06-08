import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {fuseAnimations} from '@fuse/animations';
import {ScrumboardService} from './scrumboard.service';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
    selector: 'scrumboard',
    templateUrl: './scrumboard.component.html',
    styleUrls: ['./scrumboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ScrumboardComponent implements OnInit, OnDestroy {
    applications: any;


    constructor(
        private  _router: Router,
        private _scrumboardService: ScrumboardService, private sanitizer: DomSanitizer,
    ) {
    }

    ngOnInit(): void {
        this.getAllApplication();
    }


    getAllApplication(): void {
        this.applications = null;
        this._scrumboardService.getAllApplication().subscribe(applications => {
                this.applications = applications

                this.applications.map((obj) => {
                    obj.photo = this.convert(obj.photo);
                    // or via brackets
                    // obj['total'] = 2;
                    return obj;
                });
            }
        )
        ;
    }

    ngOnDestroy(): void {

    }

    newApplication(): void {
        this._router.navigate(['/boards/' + 'new']);
    }

    convert(bytes): any {
        const objectURL = 'data:image/jpeg;base64,' + bytes;
        return this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }

}
