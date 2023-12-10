import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonthNamePipe } from 'src/app/month-name.pipe';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  providers: [MonthNamePipe],
})
export class InfoComponent {
  itemId: number;
  matchInfoDatas: any = [];
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute) {
    this.itemId = Number(this.route.snapshot.paramMap.get('id')) || 0;
  }

  async ngOnInit(): Promise<void> {
    if (this.matchInfoDatas.length === 0) {
      await this.fetchMatchInfoDetails();
    }
  }

  async fetchMatchInfoDetails() {
    const url = `https://livescore6.p.rapidapi.com/matches/v2/get-info?Category=cricket&Eid=${this.itemId}`;
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
      console.log('match info', result);
      this.matchInfoDatas.push(result);
      this.isLoading = false;
    } catch (error) {
      console.log(error);
    }
  }

  getFormattedDate(date: number, start: number, end: number): string {
    const dateString = date.toString();
    return dateString ? dateString.slice(start, end) : '';
  }
}
