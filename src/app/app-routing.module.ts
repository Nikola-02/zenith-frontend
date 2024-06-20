import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      // {
      //   path: 'tracks',
      //   loadChildren: () =>
      //     import('./components/tracks/tracks.module').then(
      //       (m) => m.RecipesModule
      //     ),
      // },
      // {
      //   path: 'shopping-list',
      //   loadChildren: () =>
      //     import('./components/shopping-list/shopping-list.module').then(
      //       (m) => m.ShoppingListModule
      //     ),
      // },
      // { path: 'contact-us', component: ContactUsComponent },
      // { path: 'author', component: AuthorComponent },

      // {
      //   path: 'admin',
      //   component: AdminLayoutComponent,
      //   canActivateChild: [adminGuard],
      //   loadChildren: () =>
      //     import('./components/admin/admin.module').then((m) => m.AdminModule),
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
