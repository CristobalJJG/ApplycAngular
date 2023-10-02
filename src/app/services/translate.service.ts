import { Injectable } from '@angular/core';
import { TranslateService as TS } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  constructor(private ts: TS) {
    let language = localStorage.getItem('language') ?? 'es';
    ts.setDefaultLang(language);
    ts.use(language);
  }

  getLang() {
    return localStorage.getItem('language') ?? 'es';
  }

  translate(opt: string) {
    localStorage.setItem('language', opt);
    this.ts.use(opt);
  }
}
