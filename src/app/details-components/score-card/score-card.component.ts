import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css'],
})
export class ScoreCardComponent {
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
      await this.fetchScoreCardDetails();
      const lastItem =
        this.summaryDatas[0]?.SDInn[this.summaryDatas[0]?.SDInn.length - 1];
      this.selectedWicketsTab = lastItem?.Ti || '';
    }
  }

  async fetchScoreCardDetails() {
    const url = `https://livescore6.p.rapidapi.com/matches/v2/get-innings?Eid=${this.itemId}&Category=cricket`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a8ec3da861mshb32744df6dd9d15p19d307jsn088147dc42cd',
        'X-RapidAPI-Host': 'livescore6.p.rapidapi.com',
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
        // return prnsArray[i].Fn + prnsArray[i].Ln;
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
        return prnsArray[i].Ln;
      }
    }
    return null;
  }

  formatLpTx(lpTx: string, bid: number, fid: number): string {
    // Replace placeholders [B] and [F] with corresponding values
    const replacedLpTx = lpTx
      .replace(/\[B\]/g, this.getBowlerByPid(bid))
      .replace(/\[F\]/g, this.getBowlerByPid(fid));
  
    return replacedLpTx;
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  selectWicketsTab(tab: string) {
    this.selectedWicketsTab = tab;
  }
}
