import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminArtistsRoutingModule } from './admin-artists-routing.module';
import { AdminArtistsCreateComponent } from './admin-artists-create/admin-artists-create.component';
import { AdminArtistsEditComponent } from './admin-artists-edit/admin-artists-edit.component';
import { AdminArtistsDashboardComponent } from './admin-artists-dashboard/admin-artists-dashboard.component';


@NgModule({
  declarations: [
    AdminArtistsCreateComponent,
    AdminArtistsEditComponent,
    AdminArtistsDashboardComponent
  ],
  imports: [
    CommonModule,
    AdminArtistsRoutingModule
  ]
})
export class AdminArtistsModule { }
