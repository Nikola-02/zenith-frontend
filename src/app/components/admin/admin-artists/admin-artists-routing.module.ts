import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminArtistsDashboardComponent } from './admin-artists-dashboard/admin-artists-dashboard.component';
import { AdminArtistsCreateComponent } from './admin-artists-create/admin-artists-create.component';
import { AdminArtistsEditComponent } from './admin-artists-edit/admin-artists-edit.component';

const routes: Routes = [
  { path: '', component: AdminArtistsDashboardComponent },
  { path: 'create', component: AdminArtistsCreateComponent },
  { path: ':id/edit', component: AdminArtistsEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminArtistsRoutingModule {}
