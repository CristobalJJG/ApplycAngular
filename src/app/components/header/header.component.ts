import { Component } from '@angular/core';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  lang = '';
  userName: string;

  constructor(private ts: TranslateService) {
    this.lang = ts.getLang();
    this.userName = localStorage.getItem('user') ?? '';
  }
  translate() {
    this.ts.translate(this.lang);
  }
}
