import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-match-summary',
  templateUrl: './match-summary.component.html',
  styleUrls: ['./match-summary.component.css'],
})
export class MatchSummaryComponent {
  itemId: number;
  summaryDatas: any = [];
  isLoading: boolean = true;
  selectedTab: string = 'Commentry';
  selectedWicketsTab: string = '';

  constructor(private route: ActivatedRoute) {
    this.itemId = Number(this.route.snapshot.paramMap.get('id')) || 0;
    console.log(this.itemId);
  }

  async ngOnInit(): Promise<void> {
    if (this.summaryDatas.length === 0) {
      await this.fetchSummaryDetails();
      const lastItem =
        this.summaryDatas[0]?.SDInn[this.summaryDatas[0]?.SDInn.length - 1];
      this.selectedWicketsTab = lastItem?.Ti || '';
    }
  }

  async fetchSummaryDetails() {
    const url = `https://livescore6.p.rapidapi.com/matches/v2/get-innings?Eid=${this.itemId}&Category=cricket`;
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
      this.summaryDatas.push(result);
      this.isLoading = false;
    } catch (error) {
      console.log(error);
    }
  }
  getBatterByPid(pid: any): any {
    // console.log('pid', pid);
    const prnsArray = this.summaryDatas[0].Prns;
    for (let i = 0; i < prnsArray.length; i++) {
      const currentPid = prnsArray[i].Pid;
      // console.log('prns', currentPid);
      if (Number(currentPid) === pid) {
        // console.log('find', prnsArray[i]);
        // return prnsArray[i].Ln; 
        const firstName = prnsArray[i].Fn;
            // Extract the first letter of the first name
            const firstLetter = firstName ? firstName.charAt(0) + ' ' : '';
            return firstLetter + prnsArray[i].Ln;
      }
    }
    return null; 
  }

  getBowlerByPid(bid: any): any {
    // console.log('pid', pid);
    const prnsArray = this.summaryDatas[0].Prns;
    for (let i = 0; i < prnsArray.length; i++) {
      const currentPid = prnsArray[i].Pid;
      // console.log('prns', currentPid);
      if (Number(currentPid) === bid) {
        // console.log('find', prnsArray[i]);
        // return prnsArray[i].Ln; 
        const firstName = prnsArray[i].Fn;
            // Extract the first letter of the first name
            const firstLetter = firstName ? firstName.charAt(0) + ' ' : '';
            return firstLetter + prnsArray[i].Ln;
      }
    }
    return null; 
  }



  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  selectWicketsTab(tab: string) {
    this.selectedWicketsTab = tab;
  }

}
