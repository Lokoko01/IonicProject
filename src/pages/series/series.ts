import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SeriesProvider} from "../../providers/series/series";

/**
 * Generated class for the SeriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-series',
    templateUrl: 'series.html',
})
export class SeriesPage {

    series;

    constructor(public seriesProvider: SeriesProvider, public http: HttpClient) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SeriesPage');
    }

    searchSeries(search: string) {
        this.reset();
        this.seriesProvider.searchSeries(search)
            .then(data => {
                this.series = data;
                console.log(this.series);
            });
    }

    private reset() {
        this.series = [];
    }

}
