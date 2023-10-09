import { Component } from '@angular/core';
import { Person } from 'src/app/interfaces/Person';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  lang = '';
  user: any = AuthenticationService.getAuth();

  constructor(private ts: TranslateService) {
    this.lang = ts.getLang();
    console.log(this.user);
  }
  translate() {
    this.ts.translate(this.lang);
  }
}
