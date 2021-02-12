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
  action: string;

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
    this.artistId = JSON.parse(localStorage.getItem('artists')) ? (JSON.parse(localStorage.getItem('artists')).slice(-1)[0].id + 1) : 1;
  }

  ngOnInit(): void { }

  async onSubmit() {
    if (this.formArtist.valid) {
      if (this.action === 'new') {
        await this.artistService.addArtist(this.formArtist.value, this.artistId);
        console.log(this.formArtist.value);
        this.artistId++
        this.formArtist.reset();
      } else {
        alert('Alguno de los campos no está relleno')
      }
    }
  }

}
