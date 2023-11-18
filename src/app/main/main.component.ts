import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListItem } from '../interfaces/list-item.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  eventId!: number;

  constructor(private router: Router) {}
  async ngOnInit(): Promise<void> {
    await this.fetchApi();
  }

  items: ListItem[] = [];

  showDetails(itemId: number): void {
    this.router.navigate(['/home/details', itemId]);
  }

  async fetchApi() {
    const url =
      'https://livescore6.p.rapidapi.com/matches/v2/list-live?Category=cricket&Timezone=-7';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a8ec3da861mshb32744df6dd9d15p19d307jsn088147dc42cd',
        'X-RapidAPI-Host': 'livescore6.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      console.log(response);
      const result = await response.json();
      console.log(result);

      result.Stages.forEach((stage: any) => {
        stage.Events.forEach((event: any) => {
          this.eventId = event.Eid;
          const tournamentName = stage.Snm;
          console.log('Event ID:', this.eventId);
          console.log('Tournament Name:', tournamentName);
          console.log('-----------------------------');
          this.items.push({
            eventId: this.eventId,
            tournamentName: tournamentName,
          });
        });
      });
    } catch (error) {
      console.error(error);
    }
  }
}
