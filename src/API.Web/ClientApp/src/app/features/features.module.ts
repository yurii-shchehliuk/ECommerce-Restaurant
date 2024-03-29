import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { GiftsNPointsComponent } from './gifts-n-points/gifts-n-points.component';
import { FeaturesRoutesModule } from './features-routes.module';
import { SharedModule } from '../shared/shared.module';
import { CommentComponent } from './comments/comment.component';
import { MatCardModule } from '@angular/material/card';
import { RegistrationDialogComponent } from './dialogs/registration-dialog/registration-dialog.component';


@NgModule({
  declarations: [ChatComponent, GiftsNPointsComponent, CommentComponent, RegistrationDialogComponent],
  imports: [
    CommonModule,
    FeaturesRoutesModule,
    SharedModule,
    MatCardModule,
  ],
  exports: [
    CommentComponent
  ]
})
export class FeaturesModule { }
