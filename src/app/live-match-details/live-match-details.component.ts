import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-live-match-details',
  templateUrl: './live-match-details.component.html',
  styleUrls: ['./live-match-details.component.css'],
})
export class LiveMatchDetailsComponent {
  itemId: number;

  constructor(private route: ActivatedRoute) {
    this.itemId = Number(this.route.snapshot.paramMap.get('id')) || 0;
    console.log(this.itemId);
  }
}
