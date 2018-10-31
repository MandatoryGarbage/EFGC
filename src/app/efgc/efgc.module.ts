import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home/home.component';
import { MatCardModule } from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { TournamentComponent } from './component/tournament/tournament.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule
  ],
  declarations: [HomeComponent, TournamentComponent]
})
export class EfgcModule { }
