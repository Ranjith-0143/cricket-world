import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LiveMatchDetailsComponent } from './live-match-details/live-match-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PlayerDetailsComponent } from './details-components/player-details/player-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatchSummaryComponent } from './details-components/match-summary/match-summary.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import { ScoreCardComponent } from './details-components/score-card/score-card.component';
import { TableComponent } from './details-components/table/table.component';
import { InfoComponent } from './details-components/info/info.component';
import { MonthNamePipe } from './month-name.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeagueDetailsComponent } from './league-details/league-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LiveMatchDetailsComponent,
    PlayerDetailsComponent,
    MatchSummaryComponent,
    ScoreCardComponent,
    TableComponent,
    InfoComponent,
    MonthNamePipe,
    LeagueDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatTableModule,
    MatGridListModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
