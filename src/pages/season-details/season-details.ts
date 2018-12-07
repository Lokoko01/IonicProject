import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SeriesProvider} from "../../providers/series/series";

/**
 * Generated class for the SeasonDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-season-details',
    templateUrl: 'season-details.html',
})
export class SeasonDetailsPage {

    details;

    constructor(public navCtrl: NavController, public navParams: NavParams, public seriesProvider: SeriesProvider) {
    }

    ionViewDidLoad() {
        const imdbID = this.navParams.get('imdbID');
        const numSeason = this.navParams.get('numSeason');
        this.seriesProvider.getSeasonDetails(imdbID, numSeason)
            .then(data => {
                this.details = data;
            });
    }

    // TODO: gérer exception saison 8 game of thrones

}
