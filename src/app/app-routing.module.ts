import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { AccessPage } from './pages/access/access.page';
import { DirectorioPage } from './pages/directorio/directorio.page';
import { PersonalPage } from './pages/personal/personal.page';
import { DocumentacionPage } from './pages/documentacion/documentacion.page';
import { ParkingPage } from './pages/parking/parking.page';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'access', component: AccessPage },
  { path: 'directory', component: DirectorioPage },
  { path: 'personal', component: PersonalPage },
  { path: 'documentation', component: DocumentacionPage },
  { path: 'parking', component: ParkingPage },
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
