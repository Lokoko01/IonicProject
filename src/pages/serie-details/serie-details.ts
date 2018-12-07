import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SeriesProvider} from "../../providers/series/series";
import {SeasonDetailsPage} from "../season-details/season-details";

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
    nbSeasons = [];
    public isActorsShown = false;
    public isDirectorShown = false;
    public isDescriptionShown = false;
    public isAwardsShown = false;
    public isSeasonsShown = false;

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

                for (let i = 0; i < this.details.totalSeasons; i++)
                    this.nbSeasons.push(i + 1);
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

    seasonsClicked() {
        this.isSeasonsShown = !this.isSeasonsShown;
    }

    goToSeason(imdbID: string, numSeason: number) {
        this.navCtrl.push(SeasonDetailsPage, {imdbID: imdbID, numSeason: numSeason});
    }

}
