import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initArtists } from 'src/assets/data/artists';

export interface Artist {
    id: number;
    band: string;
    origin: string;
    description: string;
    image: string;
    spotify: string;
    imusic: string;
    youtube: string;
    members: string;
    exmembers: string;
    web: string;
}

@Injectable({
    providedIn: 'root'
})
export class ArtistService {

    artists: Artist[];

    constructor(
        private router: Router
    ) {
        if (localStorage.getItem('artists')) {
            this.artists = JSON.parse(localStorage.getItem('artists'));
        } else {
            this.artists = initArtists;
            localStorage.setItem('artists', JSON.stringify(this.artists))
        }
    }

    addArtist(artist: Artist, id): Promise<any> {
        return new Promise((resolve, reject) => {
            artist.id = id;
            console.log(this.artists);
            this.artists.push(artist);

            localStorage.setItem('artists', JSON.stringify(this.artists));
            resolve(this.router.navigate(['home']));
        })
    }


    getAllArtists(): Promise<Artist[]> {
        return new Promise((resolve, reject) => {
            resolve(this.artists);
        })
    }

    deleteArtists(pIndice: number) {
        this.artists.splice(pIndice, 1);
        localStorage.setItem('artists', JSON.stringify(this.artists));
    }

    getById(aId: number): Promise<Artist> {
        return new Promise((resolve, reject) => {
            resolve(this.artists.find(artist => artist.id === aId))
        })
    }
}
