import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

/* Componentes */
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { FooterComponent } from './components/footer/footer.component';

/* Páginas */
import { AppComponent } from './app.component';
import { HomePage } from './pages/home/home.page';
import { DirectorioPage } from './pages/directorio/directorio.page';
import { PersonalPage } from './pages/personal/personal.page';
import { DocumentacionPage } from './pages/documentacion/documentacion.page';
import { ParkingPage } from './pages/parking/parking.page';

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
import { AccessPage } from './pages/access/access.page';

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

    /* Components */
    HeaderComponent,
    CardComponent,
    FooterComponent,
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
    MatSnackBarModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  providers: [TranslatePipe, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
