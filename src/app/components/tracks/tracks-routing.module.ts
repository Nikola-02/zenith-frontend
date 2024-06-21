import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TracksComponent } from './tracks.component';

const routes: Routes = [
  { path: '', component: TracksComponent },
  //{ path: ':id', component: RecipeDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TracksRoutingModule {}
