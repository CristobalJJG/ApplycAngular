import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss'],
})
export class AccessComponent {
  constructor(private auth: AuthenticationService) {}

  login() {
    this.auth.login('cristobal.jjg.00@gmail.com', '123456');
    console.log('hola');
  }
}
