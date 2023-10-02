import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Card } from 'src/app/interfaces/Card';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent {
  cards: Card[] = [];

  constructor(private http: HttpClient) {
    this.getCards();
  }

  async getCards() {
    try {
      const response = await this.http.get('../../../assets/data/cards.json');
      response.subscribe((data: any) => {
        data['cards'].forEach((d: Card) => {
          this.cards.push(d);
        });
      });
    } catch (error) {
      console.log('Error:', error);
    }
  }
}
