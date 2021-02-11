import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Artists } from 'src/assets/data/artists';

export interface Artists {
    id: number,
    band: string,
    origin: string,
    description: string,
    image: string,
    spotify: string,
    imusic: string,
    youtube: string,
    members: string,
    exmembers: string
}

@Injectable({
    providedIn: 'root'
})
export class ArtistsService {

    artists: Artists[];

    constructor(
        private router: Router
    ) {
        if (localStorage.getItem('artists')) {
            this.artists = JSON.parse(localStorage.getItem('artists'));
        } else {
            this.artists = Artists;
        }
    }

    addArtist(artists: Artists, id): Promise<any> {
        return new Promise((resolve, reject) => {
            artists.id = id;
            console.log(this.artists);
            this.artists.push(artists);

            localStorage.setItem('artists', JSON.stringify(this.artists));
            resolve(this.router.navigate(['home', artists.id]));
        })
    }


    getAllArtists(): Promise<Artists[]> {
        return new Promise((resolve, reject) => {
            resolve(this.artists);
        })
    }

    deleteArtists(pIndice: number) {
        this.artists.splice(pIndice, 1);
        localStorage.setItem('artists', JSON.stringify(this.artists));
    }

    getById(pId: number): Promise<Artists> {
        return new Promise((resolve, reject) => {
            resolve(this.artists.find(post => post.id === pId))
        })
    }
}
