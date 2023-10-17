import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccessComponent } from './pages/access/access.page';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'access', component: AccessComponent },
  /* {
    path: 'admin', component: AdminPanelComponent, children: [
      { path: 'users', component: UsersAdminPanelComponent },
      { path: 'collections', component: CollectionsAdminPanelComponent }
    ]
  },
  { path: '**', component: NotFoundComponent } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
