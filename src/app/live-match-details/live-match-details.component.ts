import { Component , Pipe, PipeTransform} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonthNamePipe } from '../month-name.pipe';

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
        'X-RapidAPI-Key': '03c1be5a3fmsh58575c06ce4fa3ep1c5414jsn815874b68cfa',
        'X-RapidAPI-Host': 'livescore6.p.rapidapi.com',
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
    const Scd = this.route.snapshot.paramMap.get('Scd') || '';
    const Ccd = this.route.snapshot.paramMap.get('Ccd') || '';
    const Sdn = this.route.snapshot.paramMap.get('Sdn') || '';

    this.router.navigate(['home/details', matchId, Scd, Ccd, Sdn, 'teams']);
  }
  
  leagueDetails(): void {
    console.log('League Details clicked!');
    // You can add more logic here if needed
  }  

  getFormattedDate(date: number, start: number, end: number): string {
    const dateString = date.toString();
    return dateString ? dateString.slice(start, end) : '';
  }
}

