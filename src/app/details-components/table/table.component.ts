import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  itemId: number;
  Scd: string;
  Ccd: string;
  Sdn:string;
  teamsData: any = [];
  isLoading: boolean = true;


  constructor(private route: ActivatedRoute) {
    this.itemId = Number(this.route.snapshot.paramMap.get('id')) || 0;
    this.Scd = this.route.snapshot.paramMap.get('Scd') || '';
    console.log(this.Scd);
    this.Ccd = this.route.snapshot.paramMap.get('Ccd') || '';
    console.log(this.Ccd)
    this.Sdn = this.route.snapshot.paramMap.get('Sdn') || '';
    console.log(this.Sdn)
  }

  async ngOnInit(): Promise<void> {
    if (this.teamsData.length === 0) {
      await this.fetchPlayerDetails();
    }
  }

  async fetchPlayerDetails() {
    const url = `https://livescore6.p.rapidapi.com/leagues/v2/get-table?&Category=cricket&Ccd=${this.Ccd}&Scd=${this.Scd}`;
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
      console.log('Summary:', this.teamsData[0].LeagueTable.L[0].Tables[0].team);
      console.log('Team Data:', this.teamsData[0]?.LeagueTable[0]?.L?.Tables[0]?.team);
      this.isLoading = false;

    } catch (error) {
      console.log(error);
    }
  }
}
