import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    children: [
      { path: '', redirectTo: 'tracks', pathMatch: 'full' },
      {
        path: 'tracks',
        loadChildren: () =>
          import('./admin-tracks/admin-tracks.module').then(
            (m) => m.AdminTracksModule
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
