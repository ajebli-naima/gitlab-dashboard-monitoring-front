import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScrumboardComponent} from "./scrumboard.component";
import {BoardResolve, ScrumboardService} from "./scrumboard.service";
import {ScrumboardBoardComponent} from "./board/board.component";


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'boards',
                component: ScrumboardComponent,
                resolve: {
                    scrumboard: ScrumboardService
                }
            },
            {
                path: 'boards/:boardId/:boardUri',
                component: ScrumboardBoardComponent,
                resolve: {
                    board: BoardResolve
                }
            },
            {
                path: '**',
                redirectTo: 'boards'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScrumboardRoutingModule {
}
