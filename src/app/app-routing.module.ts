import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { unauthorizedGuard } from './shared/guards/unauthorized.guard';
import { AdminLayoutComponent } from './components/layout/admin-layout/admin-layout.component';
import { userGuard } from './shared/guards/user.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [unauthorizedGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [unauthorizedGuard],
      },
      {
        path: 'tracks',
        loadChildren: () =>
          import('./components/tracks/tracks.module').then(
            (m) => m.TracksModule
          ),
      },
      {
        path: 'playlists',
        canActivateChild: [userGuard],
        loadChildren: () =>
          import('./components/playlists/playlists.module').then(
            (m) => m.PlaylistsModule
          ),
      },
      {
        path: 'admin',
        component: AdminLayoutComponent,
        //canActivateChild: [adminGuard],
        loadChildren: () =>
          import('./components/admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
