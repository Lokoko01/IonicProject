import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SeriesProvider} from "../../providers/series/series";

/**
 * Generated class for the SerieDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-serie-details',
    templateUrl: 'serie-details.html',
})
export class SerieDetailsPage {

    details;
    actors;
    genres;
    awards;
    public isActorsShown = false;
    public isDirectorShown = false;
    public isDescriptionShown = false;
    public isAwardsShown = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public seriesProvider: SeriesProvider) {

    }

    ionViewDidLoad() {
        const imdbID = this.navParams.get('imdbID');
        this.seriesProvider.getSerieDetails(imdbID)
            .then(data => {
                this.details = data;
                if (this.details != null) {
                    this.details.Poster = 'http://img.omdbapi.com/?apikey=75522b56&i=' + this.details.imdbID;
                }
                this.actors = this.details.Actors.split(',');
                this.genres = this.details.Genre.split(',');
                this.awards = this.details.Awards.split('.');
            });
    }

    actorsClicked() {
        this.isActorsShown = !this.isActorsShown;
    }

    directorClicked() {
        this.isDirectorShown = !this.isDirectorShown;
    }

    descriptionClicked() {
        this.isDescriptionShown = !this.isDescriptionShown;
    }

    awardsClicked() {
        this.isAwardsShown = !this.isAwardsShown;
    }

}
