import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatComponent } from './chat/chat.component';
import { CommentComponent } from './comments/comment.component';
import { FeaturesRoutesModule } from './features-routes.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ChatComponent, CommentComponent],
  imports: [CommonModule, FeaturesRoutesModule, SharedModule],
  exports: [CommentComponent],
})
export class FeaturesModule {}
