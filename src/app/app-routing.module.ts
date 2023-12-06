import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LiveMatchDetailsComponent } from './live-match-details/live-match-details.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: MainComponent,
    // children: [{ path: 'details/:id', component: LiveMatchDetailsComponent }],
  },
  { path: 'home/details/:id/:Scd/:Ccd/:Sdn', component: LiveMatchDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash:true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
