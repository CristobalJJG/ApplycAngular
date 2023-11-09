import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

/* Componentes */
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { PersonCardComponent } from './components/person-card/person-card.component';
import { PersonalInfoComponent } from './pages/personal/personal-info/personal-info.component';
import { ContactInfoComponent } from './pages/personal/contact-info/contact-info.component';
import { ProfessionalInfoComponent } from './pages/personal/professional-info/professional-info.component';

/* Páginas */
import { AppComponent } from './app.component';
import { HomePage } from './pages/home/home.page';
import { AccessPage } from './pages/access/access.page';
import { DirectorioPage } from './pages/directorio/directorio.page';
import { PersonalPage } from './pages/personal/personal.page';
import { DocumentacionPage } from './pages/documentacion/documentacion.page';
import { ParkingPage } from './pages/parking/parking.page';
import { NotFoundPage } from './pages/error/not-found/not-found.page';
import { NotLoggedPage } from './pages/error/not-logged/not-logged.page';
import { NotPermissionPage } from './pages/error/not-permission/not-permission.page';

/* Translate */
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  TranslateLoader,
  TranslateModule,
  TranslatePipe,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/* Cookies */
import { CookieService } from 'ngx-cookie-service';

/* Material */
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    /* Pages */
    AppComponent,
    HomePage,
    AccessPage,
    DirectorioPage,
    PersonalPage,
    DocumentacionPage,
    ParkingPage,
    NotFoundPage,
    NotLoggedPage,
    NotPermissionPage,

    /* Components */
    HeaderComponent,
    CardComponent,
    FooterComponent,
    PersonCardComponent,
    AddUserComponent,
    PersonalInfoComponent,
    ContactInfoComponent,
    ProfessionalInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FormsModule,
    BrowserAnimationsModule,

    /* Material */
    MatSnackBarModule,
    MatTooltipModule,
    MatMenuModule,
    MatDialogModule,
    MatExpansionModule,
  ],
  providers: [TranslatePipe, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
