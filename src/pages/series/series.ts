import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SeriesProvider} from "../../providers/series/series";
import {SerieDetailsPage} from "../serie-details/serie-details";
import {NavController} from "ionic-angular";

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
    public isSearchbarOpened = false;

    constructor(public navCtrl: NavController, public seriesProvider: SeriesProvider, public http: HttpClient) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SeriesPage');
    }

    searchSeries(search: string) {
        this.reset();
        this.seriesProvider.searchSeries(search)
            .then(data => {
                this.series = data;
                if (this.series != null) {
                    this.series.Poster = 'http://img.omdbapi.com/?apikey=75522b56&i=' + this.series.imdbID;
                }
                console.log(this.series);
            });
    }

    private reset() {
        this.series = [];
    }

    goToDetails(imdbID: string) {
        this.navCtrl.push(SerieDetailsPage, { imdbID: imdbID });
    }

}
