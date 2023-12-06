import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css'],
})
export class PlayerDetailsComponent {
  itemId: number;
  teamsData: any = [];
  isLoading: boolean = true;

  displayedColumns: string[] = ['team', 'position', 'fullName', 'positionA'];

  dataSource = new MatTableDataSource<any>();

  constructor(private route: ActivatedRoute) {
    this.itemId = Number(this.route.snapshot.paramMap.get('id')) || 0;
  }

  async ngOnInit(): Promise<void> {
    if (this.teamsData.length === 0) {
      await this.fetchPlayerDetails();
    }
  }

  async fetchPlayerDetails() {
    const url = `https://livescore6.p.rapidapi.com/matches/v2/get-lineups?Eid=${this.itemId}&Category=cricket`;
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
      const team1Data = this.teamsData[0].Lu[0].Ps.map((player:any) => ({
        team1: 'Team 1',
        position1: player.Pos,
        fullName1: `${player.Fn} ${player.Ln}`,
        positionA1: player.PosA
      }));
  
      const team2Data = this.teamsData[0].Lu[1].Ps.map((player:any) => ({
        team2: 'Team 2',
        position2: player.Pos,
        fullName2: `${player.Fn} ${player.Ln}`,
        positionA2: player.PosA
      }));
  
      this.dataSource.data = [...team1Data, ...team2Data];
      this.isLoading = false;
    } catch (error) {
      console.log(error);
    }
  }
}
