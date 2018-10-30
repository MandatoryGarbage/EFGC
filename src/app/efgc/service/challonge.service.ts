import { Injectable } from '@angular/core';
import { Tournament } from '../model/tournament';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'
// import { Participant } from '../model/participant';

@Injectable({
  providedIn: 'root'
})
export class ChallongeService {

  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { 
    // this.headers.append('Content-Type','application/json')
  }

  public listTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>('/api/tournaments', {headers: this.headers})
  }

  // public getParticipantsForTournament(tournamentId: number): Observable<Participant[]> {
  //   let targetUrl = `${this.url}/tournaments/${tournamentId}/participants.json${this.apiKey}`;
  //   return this.http.get<Participant[]>(targetUrl);
  // }

  public createTournament(game: number): boolean {
    let params: HttpParams = new HttpParams();
    return false;
  }
}
