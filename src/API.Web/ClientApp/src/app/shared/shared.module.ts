import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkStepperModule } from '@angular/cdk/stepper';

import { IconComponent } from './components/icon/icon.component';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';

const SHARED = [
  IconComponent,
  PagingHeaderComponent,
  PagerComponent,
  OrderTotalsComponent,
  TextInputComponent,
  StepperComponent,
  BasketSummaryComponent,
];

@NgModule({
  declarations: [...SHARED],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, CdkStepperModule],
  exports: [...SHARED, CommonModule, RouterModule, ReactiveFormsModule, FormsModule, CdkStepperModule],
})
export class SharedModule {}
