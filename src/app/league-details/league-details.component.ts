import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MonthNamePipe } from '../month-name.pipe';

@Component({
  selector: 'app-league-details',
  templateUrl: './league-details.component.html',
  styleUrls: ['./league-details.component.css'],
  providers: [MonthNamePipe],
})
export class LeagueDetailsComponent {
  leagueDatas: any = [];
  isLoading: boolean = true;
  Ccd = this.route.snapshot.paramMap.get('Ccd') || '';
  Scd = this.route.snapshot.paramMap.get('Scd') || '';
  selectedTab: string = 'Fixtures';

   constructor(private route: ActivatedRoute, private router: Router){
    console.log(this.Ccd , this.Scd);
   }

   async ngOnInit(): Promise<void> {
    if (this.leagueDatas.length === 0) {
      await this.fetchLeagueDetails();
    }
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  async fetchLeagueDetails() {
    const url = `https://livescore6.p.rapidapi.com/matches/v2/list-by-league?&Category=cricket&Ccd=${this.Ccd}&Scd=${this.Scd}&Timezone=-7`;
    const options = {
      method: 'GET',
      headers: {
        // 'X-RapidAPI-Key': 'a8ec3da861mshb32744df6dd9d15p19d307jsn088147dc42cd',
        'X-RapidAPI-Key': environment.XRapidAPIKey,
        'X-RapidAPI-Host': environment.XRapidAPIHost,
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      this.leagueDatas.push(result);
      console.log(this.leagueDatas[0].Stages[0].Snm);
      this.isLoading = false;
    } catch (error) {
      console.log(error);
    }
  }

  getFormattedDate(date: number, start: number, end: number): string {
    const dateString = date.toString();
    return dateString ? dateString.slice(start, end) : '';
  }

  showDetails(itemId: number , Scd:string , Ccd :string, Sdn:string): void {
    this.router.navigate(['/home/details', itemId,Scd , Ccd , Sdn]);
  }
}
