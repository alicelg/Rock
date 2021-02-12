import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../services/artists.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formArtist: FormGroup;
  artistId: number;


  constructor(
    private activateRoute: ActivatedRoute,
    private artistService: ArtistService,
    private router: Router
  ) {

    this.formArtist = new FormGroup({
      band: new FormControl('', [
        Validators.required
      ]),
      origin: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [
        Validators.required
      ]),
      image: new FormControl('', [
        Validators.required
      ]),
      spotify: new FormControl('', [
        Validators.required
      ]),
      imusic: new FormControl('', [
        Validators.required
      ]),
      youtube: new FormControl('', [
        Validators.required
      ]),
      members: new FormControl('', [
        Validators.required
      ]),
      exmembers: new FormControl('', [
        Validators.required
      ]),
      web: new FormControl('', [
        Validators.required
      ]),
    })
    this.artistId = JSON.parse(localStorage.getItem('posts')) ? (JSON.parse(localStorage.getItem('posts')).slice(-1)[0].id + 1) : 1;

  }

  ngOnInit(): void { }

  async onSubmit() {
    if (this.formArtist.value) {
      await this.artistService.addArtist(this.formArtist.value, this.artistId);
      this.artistId++
      this.formArtist.reset();
    }
  }
}




