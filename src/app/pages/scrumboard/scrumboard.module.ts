import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatRippleModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgxDnDModule} from '@swimlane/ngx-dnd';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseConfirmDialogModule, FuseMaterialColorPickerModule} from '@fuse/components';


import {ScrumboardRoutingModule} from './scrumboard-routing.module';
import {ScrumboardComponent} from "./scrumboard.component";
import {ScrumboardBoardComponent} from "./board/board.component";
import {ScrumboardBoardCardComponent} from "./board/list/card/card.component";
import {ScrumboardBoardListComponent} from "./board/list/list.component";
import {ScrumboardBoardAddCardComponent} from "./board/list/add-card/add-card.component";
import {ScrumboardBoardAddListComponent} from "./board/add-list/add-list.component";
import {ScrumboardCardDialogComponent} from "./board/dialogs/card/card.component";
import {ScrumboardLabelSelectorComponent} from "./board/dialogs/card/label-selector/label-selector.component";
import {ScrumboardEditBoardNameComponent} from "./board/edit-board-name/edit-board-name.component";
import {ScrumboardBoardSettingsSidenavComponent} from "./board/sidenavs/settings/settings.component";
import {ScrumboardBoardColorSelectorComponent} from "./board/sidenavs/settings/board-color-selector/board-color-selector.component";
import {ScrumboardBoardEditListNameComponent} from "./board/list/edit-list-name/edit-list-name.component";
import {BoardResolve, ScrumboardService} from "./scrumboard.service";
import {MatSelectModule, MatStepperModule} from "@angular/material";

@NgModule({
    declarations: [
        ScrumboardComponent,
        ScrumboardBoardComponent,
        ScrumboardBoardListComponent,
        ScrumboardBoardCardComponent,
        ScrumboardBoardEditListNameComponent,
        ScrumboardBoardAddCardComponent,
        ScrumboardBoardAddListComponent,
        ScrumboardCardDialogComponent,
        ScrumboardLabelSelectorComponent,
        ScrumboardEditBoardNameComponent,
        ScrumboardBoardSettingsSidenavComponent,
        ScrumboardBoardColorSelectorComponent
    ],
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTooltipModule,
        MatSelectModule,
        MatStepperModule,

        FuseSharedModule,

        NgxDnDModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseMaterialColorPickerModule,
        ScrumboardRoutingModule
    ],
    providers: [
        ScrumboardService,
        BoardResolve
    ],
    entryComponents: [ScrumboardCardDialogComponent]
})
export class ScrumboardModule {
}
