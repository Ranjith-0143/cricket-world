import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListItem } from '../interfaces/list-item.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [DatePipe],
})
export class MainComponent implements OnInit {
  eventId!: number;
  tournamentName!: string;
  countryName!: string;
  eventText!: string;
  eventInfo!: string;
  eventStatusText!: string;
  Team1Name!: string;
  Team2Name!: string;
  eventComment!: string;
  eventStartDate!: string;
  eventEndDate!: string;
  team1Score!: number;
  team2Score!: number;
  team1Wickets!: number;
  team2Wickets!: number;
  team1Overs!: number;
  team2Overs!: number;

  team1Score2!: number;
  team2Score2!: number;

  team1Wickets2!: number;
  team2Wickets2!: number;

  constructor(private router: Router) {}
  isLoading: boolean = true;
  async ngOnInit(): Promise<void> {
    setTimeout(async () => {
      await this.fetchApi();
      this.isLoading = false; // Set isLoading to false when data is loaded
    }, 2000);
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
        this.tournamentName = stage.Snm;
        this.countryName = stage.Cnm;
        stage.Events.forEach((event: any) => {
          this.eventId = event.Eid;
          this.eventText = event.EtTx; // main event text
          this.eventInfo = event.ErnInf; // sub event text
          this.eventStatusText = event.EpsL;
          this.Team1Name = event.T1[0].Nm;
          this.Team2Name = event.T2[0].Nm;
          this.eventComment = event.ECo;
          // this.eventStartDate = event.Esd;
          // this.eventEndDate = event.Ese;
          this.eventStartDate = this.formatDateString(event.Esd);
          this.eventEndDate = this.formatDateString(event.Ese);
          this.team1Score = event.Tr1C1;
          this.team2Score = event.Tr2C1;

          this.team1Score2 = event.Tr1C2;
          this.team2Score2 = event.Tr2C2;

          this.team1Wickets = event.Tr1CW1;
          this.team2Wickets = event.Tr2CW1;

          this.team1Wickets2 = event.Tr1CW2;
          this.team2Wickets2 = event.Tr2CW2;

          console.log('-----------------------------');
          console.log('Event ID:', this.eventId);
          console.log('t1 w', this.team1Wickets);
          console.log('t2 w', this.team2Wickets);
          console.log('t1 over', this.team1Overs);
          console.log('t2 over', this.team2Overs);
          console.log('t1 se', this.team1Score);
          console.log('t2 se', this.team2Score);
          console.log('-----------------------------');
          this.items.push({
            eventId: this.eventId,
            tournamentName: this.tournamentName,
            countryName: this.countryName,
            eventText: this.eventText,
            eventInfo: this.eventInfo,
            eventStatusText: this.eventStatusText,
            Team1Name: this.Team1Name,
            Team2Name: this.Team2Name,
            eventComment: this.eventComment,
            eventStartDate: this.eventStartDate,
            eventEndDate: this.eventEndDate,
            team1Score: this.team1Score,
            team2Score: this.team2Score,
            team1Wickets: this.team1Wickets,
            team2Wickets: this.team2Wickets,
            team1Score2: this.team1Score2,
            team2Score2: this.team2Score2,
            team1Wickets2: this.team1Wickets2,
            team2Wickets2: this.team2Wickets2,
          });
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  formatDateString(dateString: string): string {
    const dateStringStr = String(dateString);

    // Ensure that the string has at least 14 characters before attempting to slice
    if (dateStringStr.length >= 14) {
      const year = dateStringStr.slice(0, 4);
      const month = dateStringStr.slice(4, 6);
      const day = dateStringStr.slice(6, 8);
      const hours = dateStringStr.slice(8, 10);
      const minutes = dateStringStr.slice(10, 12);
      const seconds = dateStringStr.slice(12, 14);

      return `${day}-${month}-${year}`;
    } else {
      console.error('Invalid dateString format:', dateStringStr);
      return ''; // Return an empty string or handle the error accordingly
    }
  }
}
