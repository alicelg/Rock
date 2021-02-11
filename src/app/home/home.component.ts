import { Component, OnInit } from '@angular/core';
import { Artists, ArtistsService } from '../services/artists.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  arrArtists: Artists[];


  constructor(private artistsService: ArtistsService) { }

  ngOnInit(): void {
    this.artistsService.getAllArtists()
      .then(artists => {
        this.arrArtists = artists;
      })
  }

}
