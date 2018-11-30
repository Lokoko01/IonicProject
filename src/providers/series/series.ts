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

}
