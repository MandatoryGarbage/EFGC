import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingComponent } from './component/ranking/ranking.component';
import { NewTournamentComponent } from './component/new-tournament/new-tournament.component';
import { HomeComponent } from './component/home/home.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RankingComponent, NewTournamentComponent, HomeComponent],
  entryComponents: [NewTournamentComponent]
})
export class EfgcModule { }
