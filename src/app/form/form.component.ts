import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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

    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    this.formArtist = new FormGroup({
      band: new FormControl('Alice López', [
        Validators.required
      ]),
      origin: new FormControl('Colombia - España', [
        Validators.required
      ]),
      description: new FormControl('Futura programadora de Front-end en Kubide. ', [
        Validators.required
      ]),
      image: new FormControl('https://alicelg.github.io/Proyectos/tecnologias', [
        Validators.required, this.regexValidator(new RegExp(urlRegex), { 'url': true })
      ]),
      spotify: new FormControl('https://alicelg.github.io/Proyectos/formacion', [
        Validators.required, this.regexValidator(new RegExp(urlRegex), { 'url': true })
      ]),
      imusic: new FormControl('https://alicelg.github.io/Proyectos/proyectos', [
        Validators.required, this.regexValidator(new RegExp(urlRegex), { 'url': true })
      ]),
      youtube: new FormControl('https://www.youtube.com/embed/if1Hk1qgm14', [
        Validators.required, this.regexValidator(new RegExp(urlRegex), { 'url': true })
      ]),
      members: new FormControl('Alice López', [
        Validators.required
      ]),
      exmembers: new FormControl('Ninguno', [
        Validators.required
      ]),
      web: new FormControl('https://alicelg.github.io/Proyectos/', [
        Validators.required, this.regexValidator(new RegExp(urlRegex), { 'url': true })
      ]),
    })
    this.artistId = JSON.parse(localStorage.getItem('artists')) ? (JSON.parse(localStorage.getItem('artists')).slice(-1)[0].id + 1) : 1;

  }

  ngOnInit(): void { }

  async onSubmit() {
    if (this.formArtist.valid) {
      await this.artistService.addArtist(this.formArtist.value, this.artistId);
      this.artistId++
      this.formArtist.reset();
    } else {
      Object.keys(this.formArtist.controls).forEach(field => {
        const control = this.formArtist.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  regexValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }
}




