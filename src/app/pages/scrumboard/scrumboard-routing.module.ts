import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScrumboardComponent} from './scrumboard.component';
import {ScrumboardService} from './scrumboard.service';
import {ScrumboardBoardComponent} from './board/board.component';
import {GitlabComponent} from "./gitlab/gitlab.component";


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'boards',
                component: ScrumboardComponent,
            },
            {
                path: 'boards/:boardId',
                component: ScrumboardBoardComponent,
            },
            {
                path: 'gitlab/:projectId',
                component: GitlabComponent,
            },
            {
                path: '**',
                redirectTo: 'boards'
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScrumboardRoutingModule {
}
