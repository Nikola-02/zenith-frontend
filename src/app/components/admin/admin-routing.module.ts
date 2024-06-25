import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: AdminComponent, pathMatch: 'full' },
      {
        path: 'tracks',
        loadChildren: () =>
          import('./admin-tracks/admin-tracks.module').then(
            (m) => m.AdminTracksModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./admin-users/admin-users.module').then(
            (m) => m.AdminUsersModule
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
