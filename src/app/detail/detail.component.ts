import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist, ArtistService } from '../services/artists.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  arrArtists: Artist[];
  selectedArtist: Artist


  constructor(
    private activateRoute: ActivatedRoute,
    private artistService: ArtistService,
    private router: Router) { }

  ngOnInit(): void {

    this.artistService.getAllArtists()
      .then(artists => {
        this.arrArtists = artists;
      })
    const artistId = Number(this.activateRoute.snapshot.paramMap.get('artistId'))

    this.getArtistData(artistId)
  }

  getArtistData(artistId) {
    this.artistService.getById(artistId).then(artist => {
      if (artist) {
        this.selectedArtist = artist
      } else {
        this.router.navigate(['error'])
      }
    })
  }

  onClickDelete(pIndice: number) {
    this.artistService.deleteArtists(pIndice);
    this.router.navigate(['home'])
  }

}
