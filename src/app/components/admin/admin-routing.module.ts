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
      {
        path: 'genres',
        loadChildren: () =>
          import('./admin-genres/admin-genres.module').then(
            (m) => m.AdminGenresModule
          ),
      },
      {
        path: 'artists',
        loadChildren: () =>
          import('./admin-artists/admin-artists.module').then(
            (m) => m.AdminArtistsModule
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
