import { Component , Pipe, PipeTransform} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonthNamePipe } from '../month-name.pipe';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-live-match-details',
  templateUrl: './live-match-details.component.html',
  styleUrls: ['./live-match-details.component.css'],
  providers: [MonthNamePipe],
})

export class LiveMatchDetailsComponent {
  itemId: number;
  selectedTab: string = 'Info';
  teamsData: any = [];
  isLoading: boolean = true;
  Scd = this.route.snapshot.paramMap.get('Scd') || '';
  Ccd = this.route.snapshot.paramMap.get('Ccd') || '';
  Sdn = this.route.snapshot.paramMap.get('Sdn') || '';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  constructor(private route: ActivatedRoute , private router: Router , private monthNamePipe: MonthNamePipe) {
    this.itemId = Number(this.route.snapshot.paramMap.get('id')) || 0;
    console.log(this.itemId);
  }

  async ngOnInit(): Promise<void> {
    if (this.teamsData.length === 0) {
      await this.fetchPlayerDetails();
    }
  }

  async fetchPlayerDetails() {
    const url = `https://livescore6.p.rapidapi.com/matches/v2/get-scoreboard?Eid=${this.itemId}&Category=cricket`;
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
      this.teamsData.push(result);
      console.log(this.teamsData[0].ECo);
      console.log(this.teamsData[0].Stg.Sdn)
      this.isLoading = false;
    } catch (error) {
      console.log(error);
    }
  }
  
  navigateToTeams() {
    const matchId = this.itemId;
    this.router.navigate(['home/details', matchId, this.Scd, this.Ccd, this.Sdn, 'teams']);
  }
  
  leagueDetails(Ccd:string ,Scd:string): void {
    this.router.navigate(['/home/league', Ccd , Scd]);
  }

  getFormattedDate(date: number, start: number, end: number): string {
    const dateString = date.toString();
    return dateString ? dateString.slice(start, end) : '';
  }
}

