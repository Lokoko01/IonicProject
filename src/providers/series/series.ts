import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SeriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SeriesProvider {

    apiUrl = 'http://www.omdbapi.com/?apikey=75522b56&';

    constructor(public http: HttpClient) {
        console.log('Hello SeriesProvider Provider');
    }

    searchSeries(search: string) {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 's=' + search + '&type=series')
                .subscribe(data => {
                    // @ts-ignore
                    resolve(data.Search);
                }, err => {
                    console.log(err);
                });
        })
    }

    getSerieDetails(imdbID: string) {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'i=' + imdbID + '&plot=full')
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    console.log(err);
                });
        })
    }

    getSeasonDetails(imdbID: string, numSeason: number) {
        console.log(this.apiUrl + 'i=' + imdbID + '&Season=' + numSeason);
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'i=' + imdbID + '&Season=' + numSeason)
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    console.log(err);
                });
        })
    }

    getEpisodeDetails(numEpisode: number, numSeason: number, title: string) {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'Episode=' + numEpisode + '&Season=' + numSeason + '&t=' + title)
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    console.log(err);
                });
        })
    }

}
