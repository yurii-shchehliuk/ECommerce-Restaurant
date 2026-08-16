import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ToastHostComponent } from './toast-host/toast-host.component';
import { TestErrorComponent } from './test-error/test-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NavBarComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    SectionHeaderComponent,
    ToastHostComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [NavBarComponent, SectionHeaderComponent, ToastHostComponent],
})
export class CoreModule {}
