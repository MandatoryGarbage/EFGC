import { Component, OnInit } from '@angular/core';
import { ChallongeService } from '../../service/challonge.service';
import { Tournament } from '../../model/tournament';
import { TournamentByGame } from '../../model/tournament-by-game';

@Component({
  selector: 'efgc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tournaments: Tournament[] = [];
  tournamentsByGame: TournamentByGame[] = [];
  constructor(public challongeService: ChallongeService) { }

  ngOnInit() {
    console.log('Trying to get tournaments');
    this.challongeService.listTournaments().subscribe(data => {
      this.tournaments = data;
      this.orderTournamentsByGame();
    });
  }

  private orderTournamentsByGame(): void {
    let dbfz = this.tournaments.filter(value => value.tournament.name.toUpperCase().indexOf('DBFZ') > -1);
    this.tournamentsByGame.push({game: 'Dragonball Fighterz', tournaments: dbfz});
    let unist = this.tournaments.filter(value => value.tournament.name.toUpperCase().indexOf('UNIST') > -1);
    this.tournamentsByGame.push({game: 'Undernight Inbirth Exe: Late[ST]', tournaments: unist});
    let bbtag = this.tournaments.filter(value => value.tournament.name.toUpperCase().indexOf('BBTAG') > -1);
    this.tournamentsByGame.push({game: 'BlazBlue: Cross Tag Battle', tournaments: bbtag});
    let sfv = this.tournaments.filter(value => value.tournament.name.toUpperCase().indexOf('SFV') > -1);
    this.tournamentsByGame.push({game: 'Street Fighter V: Arcade Edition', tournaments: sfv});
    let tekken = this.tournaments.filter(value => value.tournament.name.toUpperCase().indexOf('TEKKEN7') > -1);
    this.tournamentsByGame.push({game: 'Tekken 7', tournaments: tekken});
  }

}
