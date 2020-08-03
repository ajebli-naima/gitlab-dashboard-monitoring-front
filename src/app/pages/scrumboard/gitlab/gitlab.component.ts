import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GitlabService} from "./gitlab.service";
import {FormBuilder} from "@angular/forms";
import {ScrumboardService} from "../scrumboard.service";
import {MatDatepickerInputEvent, MatTabChangeEvent} from "@angular/material";


import * as Chart from 'chart.js'
import {Subscription} from "rxjs";

@Component({
    selector: 'app-gitlab',
    templateUrl: './gitlab.component.html',
    styleUrls: ['./gitlab.component.scss']
})
export class GitlabComponent implements OnInit {
    private _CommitUnitSubscription: Subscription;
    private _CommitUserSubscription: Subscription;

    chart1: Chart;
    chart2: Chart;

    startDate;
    endDate;

    idProject: any;
    commitsPerProjectAndBranch: any;
    statistics: any;

    projects: any;

    application: any;

    constructor(private route: ActivatedRoute, private router: Router, fb: FormBuilder,
                private gitlabService: GitlabService, private _scrumboardService: ScrumboardService) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.idProject = params.get('projectId');
            /**
             this.gitlabService.findAllBranchsPerProject(this.idProject).subscribe(branchs => {
                this.branchs = branchs;
            });
             */
            this._scrumboardService.getApplication(this.idProject).subscribe(application => {
                this.application = application;
            });
            this.gitlabService.findAllProjects(this.idProject).subscribe(result => {
                this.projects = result;
            });
        });
    }

    /*
    calculateDiff(dateStart: Date, dateEnd: Date) {
        let Difference_In_Time = dateEnd.getTime() - dateStart.getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        return parseInt(Difference_In_Days.toString());
    }

    defineRange(diff) {
        if (diff < 30) {
            return 'day'
        } else if (diff < 366) {
            return 'month'
        } else {
            return 'year'
        }
    }
     */

    loadCommit() {
        /*
        let interval = 'year';
        if (this.startDate && this.endDate) {
            interval = this.defineRange(this.calculateDiff(this.startDate._d, this.endDate._d));
        }
        */

        if (this.chart1) {
            this.chart1.destroy();
        }

        if (this.chart2) {
            this.chart2.destroy();
        }

        if (this._CommitUnitSubscription) {
            this._CommitUnitSubscription.unsubscribe();
        }

        if (this._CommitUserSubscription) {
            this._CommitUserSubscription.unsubscribe();
        }


        this._CommitUnitSubscription = this.gitlabService.findAllCommitsPerProjectAndBranchPerUnit(this.idProject.id,
            this.startDate, this.endDate).subscribe(values => {
            this.statistics = values;
            let canvas = null;
            canvas = <HTMLCanvasElement>document.getElementById("chart2");
            this.chart2 = null;
            this.chart2 = new Chart(canvas,
                {
                    type: 'line',
                    data:
                        {
                            datasets: this.dataFactory(this.statistics.commitPerUnit)
                        },
                    options:
                        {
                            scales:
                                {
                                    xAxes:
                                        [{
                                            type: 'time',
                                            time:
                                                {
                                                    unit: this.statistics.unit,
                                                }
                                        }]
                                },
                            legend:
                                {
                                    display: true
                                },
                            animation:
                                {
                                    duration: 0,
                                },
                            hover:
                                {
                                    animationDuration: 0,
                                },
                            responsiveAnimationDuration: 0,
                        }
                });
        });

        this._CommitUserSubscription = this.gitlabService
            .findAllCommitsPerProjectAndBranch(this.idProject.id,
                this.startDate, this.endDate)
            .subscribe(result => {
                this.commitsPerProjectAndBranch = result;
                //const entries = Object.entries(this.commitsPerProjectAndBranch.commitPerUser);
                let data = this.generateArray(this.commitsPerProjectAndBranch.commitPerUser, 'canvas');
                let labels = this.getLabels(data);
                let values = this.getValues(data);
                let canvas = null;
                canvas = <HTMLCanvasElement>document.getElementById("chart1");
                this.chart1 = null;
                this.chart1 = new Chart(canvas,
                    {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    label: "",
                                    backgroundColor: this.poolColors(values.length),
                                    data: values
                                }
                            ]
                        },
                        options:
                            {
                                scales: {
                                    xAxes: [{
                                        barPercentage: 0.4
                                    }],
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                },
                                legend:
                                    {
                                        display: false
                                    }
                            }
                    });
            });
    }

    poolColors(a) {
        let pool = [];
        for (let i = 0; i < a; i++) {
            pool.push(this.dynamicColors());
        }
        return pool;
    }

    getLabels(obj) {
        return Object.keys(obj).map(function (key) {
            return obj[key].label;
        });
    }

    getValues(obj) {
        return Object.keys(obj).map(function (key) {
            return obj[key].y;
        });
    }


    dynamicColors() {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }


    dataFactory(obj) {
        let dataset = [];
        Object.keys(obj).map((key) => {
            dataset.push({
                data: this.generateArray(obj[key], 'chart'),
                borderWidth: 2,
                borderColor: this.dynamicColors(),
                label: key,
                fill: false,
                radius: 4,
            });
        });
        return dataset;
    }

    generateArray(obj, canvas) {
        if (canvas === 'canvas') {
            return Object.keys(obj).map((key) => {
                return {label: key, y: obj[key]}
            });
        } else {
            return Object.keys(obj).map((key) => {
                return {x: key, y: obj[key]}
            });

        }
    }

    tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
        console.log('tabChangeEvent => ', tabChangeEvent.tab.textLabel);
        console.log('index => ', tabChangeEvent.index);

        if (this._CommitUnitSubscription) {
            this._CommitUnitSubscription.unsubscribe();
        }

        if (this._CommitUserSubscription) {
            this._CommitUserSubscription.unsubscribe();
        }
        let currentDate = new Date();
        this.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        this.endDate = currentDate;
        this.commitsPerProjectAndBranch = null;
        this.statistics = null;
        this.idProject = this.projects.find(x => x.name === tabChangeEvent.tab.textLabel);
        this.loadCommit();
    }

    addEventStart(input: string, $event: MatDatepickerInputEvent<any>) {
        // this.startDate = $event.value;
        this.loadCommit();
    }


    addEventEnd(input: string, $event: MatDatepickerInputEvent<unknown>) {
        // this.endDate = $event.value;
        this.loadCommit();
    }

    onBranchChange() {
        this.loadCommit();
    }
}
