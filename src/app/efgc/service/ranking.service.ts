import { Injectable } from '@angular/core';
import { PowerRanking } from '../model/power-ranking';
import { Player } from '../model/player';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  powerRankings: PowerRanking[] = [];
  players: Player[] = [];

  constructor() { }

  public addScore(name: string, placing: number, game: string, tournamentId: number) {
    const score = this.calculateScore(placing);
    const possiblePlayers = this.players.filter(value => value.name.toUpperCase().trim() === name.toUpperCase().trim() && value.game === game);
    if (possiblePlayers.length === 1) {
      this.updatePlayerScores(possiblePlayers[0], score, tournamentId);
      // possiblePlayers[0].updateWeightedAverage(score);
    } else {
      const player = new Player();
      player.name = name;
      player.game = game;
      this.updatePlayerScores(player, score, tournamentId);
      this.players.push(player);
      // console.log(`Added player: ${player.name} for ${player.game}`);
    }
  }

  private calculateScore(placing: number): number {
    switch (placing) {
      case 1: {
        return 40;
      }
      case 2: {
        return 25;
      }
      case 3: {
        return 15;
      }
      case 4: {
        return 10;
      }
      case 5: {
        return 5.5;
      }
      case 7:  {
        return 3.5;
      }
      case 9: {
        return 2.5;
      }
      case 13: {
        return 1.5;
      }
      default: {
        return 0;
      }
    }
  }

  private updatePlayerScores(player: Player, score: number, tournamentId: number): void {
    if (player.bracketsPlayed.indexOf(tournamentId) === -1) {
      player.weightedScore += score;
      player.bracketsPlayed.push(tournamentId);
      player.weightedAverage = player.weightedScore / player.bracketsPlayed.length;
    }
  }
}
