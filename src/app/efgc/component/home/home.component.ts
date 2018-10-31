import { Component, OnInit } from '@angular/core';
import { ChallongeService } from '../../service/challonge.service';
import { Tournament } from '../../model/tournament';
import { TournamentByGame } from '../../model/tournament-by-game';
import { GameEnum } from '../../enum/game.enum';

@Component({
  selector: 'efgc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tournaments: Tournament[] = [];
  tournamentsByGame: TournamentByGame[] = [];
  games = GameEnum;
  constructor(public challongeService: ChallongeService) { }

  ngOnInit() {
    this.challongeService.listTournaments().subscribe(data => {
      this.tournaments = data.filter(value => value.tournament.name.indexOf('League') === -1);
      this.orderTournamentsByGame();
    });
  }

  private orderTournamentsByGame(): void {
    const dbfz = this.tournaments.filter(value => value.tournament.name.toUpperCase().indexOf('DBFZ') > -1);
    this.tournamentsByGame.push({ game: 'Dragonball Fighterz', tournaments: dbfz });
    // const unist = this.tournaments.filter(value => value.tournament.name.toUpperCase().indexOf('UNIST') > -1);
    // this.tournamentsByGame.push({ game: 'Undernight Inbirth Exe: Late[ST]', tournaments: unist });
    // const bbtag = this.tournaments.filter(value => value.tournament.name.toUpperCase().indexOf('BBTAG') > -1);
    // this.tournamentsByGame.push({ game: 'BlazBlue: Cross Tag Battle', tournaments: bbtag });
    // const sfv = this.tournaments.filter(value => value.tournament.name.toUpperCase().indexOf('SFV') > -1);
    // this.tournamentsByGame.push({ game: 'Street Fighter V: Arcade Edition', tournaments: sfv });
    // const tekken = this.tournaments.filter(value => value.tournament.name.toUpperCase().indexOf('TEKKEN7') > -1);
    // this.tournamentsByGame.push({ game: 'Tekken 7', tournaments: tekken });
  }

}
