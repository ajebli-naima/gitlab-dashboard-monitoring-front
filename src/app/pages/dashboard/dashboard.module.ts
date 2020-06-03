import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {Dashboard1Component} from './dashboard1/dashboard1.component';


@NgModule({
  declarations: [Dashboard1Component],
  imports: [
    CommonModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
