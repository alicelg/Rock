import { Component, OnInit } from '@angular/core';
import { Artist, ArtistService } from '../services/artists.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  arrArtists: Artist[];
  arrArtistFiltered: Artist[];

  constructor(private artistService: ArtistService) { }

  ngOnInit(): void {
    this.artistService.getAllArtists()
      .then(artists => {
        this.arrArtists = artists;
        this.arrArtistFiltered = artists;
      })
  }

  filterArtistsByTerm(termSearch) {
    if (termSearch.length >= 2 || termSearch.length == 0) {
      this.arrArtistFiltered = this.arrArtists.filter(artist => {
        return artist.band.toLowerCase().includes(termSearch.toLowerCase());
      })
    }
  }

}
