import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'chat',
    loadComponent: () => import('./chat/chat.component').then((m) => m.ChatComponent),
    title: 'Chat - Owlet',
  },
  { path: '', pathMatch: 'full', redirectTo: 'chat' },
];
