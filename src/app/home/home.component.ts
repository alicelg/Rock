import { Component, OnInit } from '@angular/core';
import { Artist, ArtistService } from '../services/artists.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  arrArtists: Artist[];

  constructor(private artistService: ArtistService) { }

  ngOnInit(): void {
    this.artistService.getAllArtists()
      .then(artists => {
        this.arrArtists = artists;
      })
  }

}
