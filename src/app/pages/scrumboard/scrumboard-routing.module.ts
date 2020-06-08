import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScrumboardComponent} from './scrumboard.component';
import {ScrumboardService} from './scrumboard.service';
import {ScrumboardBoardComponent} from './board/board.component';


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
