import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist, ArtistService } from '../services/artists.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {


  selectedArtist: Artist


  constructor(
    private activateRoute: ActivatedRoute,
    private artistsService: ArtistService,
    private router: Router) { }

  ngOnInit(): void {

    const artistId = Number(this.activateRoute.snapshot.paramMap.get('artistId'))
    console.log(artistId);
    this.artistsService.getById(artistId).then(artist => {
      if (artist) {
        this.selectedArtist = artist
      } else {
        this.router.navigate(['error'])
      }
    })
  }

}
