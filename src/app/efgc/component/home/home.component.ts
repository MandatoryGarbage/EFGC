import { Component, OnInit } from '@angular/core';
import { ChallongeService } from '../../service/challonge.service';
import { Tournament } from '../../model/tournament';

@Component({
  selector: 'efgc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tournaments: Tournament[] = [];
  constructor(public challongeService: ChallongeService) { }

  ngOnInit() {
    console.log('Trying to get tournaments');
    this.challongeService.listTournaments().subscribe(data => {
      console.log(data);
      this.tournaments = data;
    })
  }

}
