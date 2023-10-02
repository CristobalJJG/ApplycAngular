import { Component, Input } from '@angular/core';
import { Card } from 'src/app/interfaces/Card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() data: Card | undefined;
}
