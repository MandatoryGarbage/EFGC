import { Component, OnInit, Input } from '@angular/core';
import { ChallongeService } from '../../service/challonge.service';
import { Participant } from '../../model/participant';
import { RankingService } from '../../service/ranking.service';
import { Match } from '../../model/match';

@Component({
  selector: 'efgc-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
  private _tournamentId: number = 0;
  private flag: boolean = false;

  @Input()
  set tournamentId(tournamentId: number) {
    this._tournamentId = tournamentId;
    if (this._tournamentId > 0 && this.game !== '' && !this.flag) {
      this.flag = true;
      this.getMatches();
    }
  }

  @Input()
  set game(game: string) {
    this._game = game;
    if (this._tournamentId > 0 && this.game !== '' && !this.flag) {
      this.flag = true;
      this.getMatches();
    }
  }
  private _game: string = '';

  participants: Participant[] = [];
  matches: Match[] = [];
  constructor(private challongeService: ChallongeService, private rankingService: RankingService) { }

  ngOnInit() {
  }

  private getMatches() {
    this.challongeService.getParticipantsForTournament(this._tournamentId).subscribe(participants => {
      this.participants = participants.sort((n1, n2) => n1.participant.final_rank - n2.participant.final_rank);
      this.challongeService.getMatchesForTournament(this._tournamentId).subscribe(matches => {
        this.matches = matches;
        this.findDQMatches();
      });
    });
  }

  private findDQMatches(): void {
    for (const match of this.matches) {
      if (match.match.scores_csv.charAt(0) === '-') {
       this.removePlayer(match.match.player1_id);
      } else if (match.match.scores_csv.charAt(2) === '-' && match.match.scores_csv.charAt(1) === '-') {
        this.removePlayer(match.match.player2_id);
      }
    }
    this.processRemainingPlayerScores();
  }

  private removePlayer(id: number): void {
    for (let i = 0; i < this.participants.length; i++) {
      if (this.participants[i].participant.id === id) {
        this.participants.splice(i, 1);
      }
    }
  }

  private processRemainingPlayerScores(): void {
    for (const participant of this.participants) {
      this.rankingService.addScore(participant.participant.name, participant.participant.final_rank, this._game, this._tournamentId);
    }
    console.log(this.rankingService.players.sort((n1, n2) => n2.weightedAverage - n1.weightedAverage));
  }

}
