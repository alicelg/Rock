import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artists, ArtistsService } from '../services/artists.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {


  artistsSelect: Artists


  constructor(
    private artistsService: ArtistsService,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    const artistsId = Number(this.activateRoute.snapshot.paramMap.get('artistsId'))
    console.log(artistsId);
    this.artistsService.getById(artistsId).then(artist => {
      if (artist) {
        this.artistsSelect = artist
      } else {
        this.router.navigate(['error'])
      }
    })
  }

}
