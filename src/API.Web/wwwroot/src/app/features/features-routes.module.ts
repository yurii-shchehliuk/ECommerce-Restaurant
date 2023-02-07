import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { GiftsNPointsComponent } from './gifts-n-points/gifts-n-points.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'Gifts-n-Points', component: GiftsNPointsComponent },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutesModule { }
