import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css'],
})
export class PlayerDetailsComponent {
  itemId: number;
  teamsData: any = [];
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute) {
    this.itemId = Number(this.route.snapshot.paramMap.get('id'));
  }

  async ngOnInit(): Promise<void> {
    if (this.teamsData.length === 0) {
      await this.fetchPlayerDetails();
    }
  }

  combinePlayerData(): any[] {
    const team1Players = this.teamsData[0]?.Lu[0]?.Ps || [];
    const team2Players = this.teamsData[0]?.Lu[1]?.Ps || [];

    // Combine player data from both teams
    const maxLength = Math.max(team1Players.length, team2Players.length);

    return Array.from({ length: maxLength }, (_, index) => ({
      team1: team1Players[index] || { Snm: '', Pos: 0 },
      team2: team2Players[index] || { Snm: '', Pos: 0 },
    }));
  }

  async fetchPlayerDetails() {
    const url = `https://livescore6.p.rapidapi.com/matches/v2/get-lineups?Eid=${this.itemId}&Category=cricket`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': environment.XRapidAPIKey,
        'X-RapidAPI-Host': environment.XRapidAPIHost,
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      this.teamsData.push(result);
      this.isLoading = false;
    } catch (error) {
      console.log(error);
    }
  }
}
