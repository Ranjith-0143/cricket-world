import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [DatePipe],
})
export class MainComponent implements OnInit {
  teamsData: any = [];
  isLoading: boolean = true;

  constructor(private router: Router , private datePipe: DatePipe) {
  }

  async ngOnInit(): Promise<void> {
    if (this.teamsData.length === 0) {
      await this.fetchApi();
    }
  }


  showDetails(itemId: number , Scd:string , Ccd :string, Sdn:string): void {
    this.router.navigate(['/home/details', itemId,Scd , Ccd , Sdn]);
  }

  async fetchApi() {
    const url =
      'https://livescore6.p.rapidapi.com/matches/v2/list-live?Category=cricket&Timezone=-7';
    // const url =
    //   'https://livescore6.p.rapidapi.com/matches/v2/list-by-date?Category=cricket&Date=20241207&Timezone=-7';
    // const formattedDate = this.datePipe.transform(this.selectedDate, 'yyyyMMdd');
    
    const options = {
      method: 'GET',
      headers: {
        // 'X-RapidAPI-Key': '03c1be5a3fmsh58575c06ce4fa3ep1c5414jsn815874b68cfa',
        'X-RapidAPI-Key': environment.XRapidAPIKey,
        'X-RapidAPI-Host': environment.XRapidAPIHost,
      },
    };

    try {
      const response = await fetch(url, options);
      console.log(response);
      const result = await response.json();
      console.log(result);
      this.teamsData.push(result);
      this.isLoading = false;
    } catch (error) {
      console.error(error);
    }
  }

  getFormattedDate(date: number, start: number, end: number): string {
    const dateString = date.toString();
    return dateString ? dateString.slice(start, end) : '';
  }
}
