import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MoviesProvider} from "../../providers/movies/movies";

/**
 * Generated class for the MovieDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-movie-details',
    templateUrl: 'movie-details.html',
})
export class MovieDetailsPage {

    details;
    actors;
    genres;
    awards;
    public isActorsShown = false;
    public isDirectorShown = false;
    public isDescriptionShown = false;
    public isAwardsShown = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public moviesProvider: MoviesProvider) {

    }

    ionViewDidLoad() {
        const imdbID = this.navParams.get('imdbID');
        this.moviesProvider.getMovieDetails(imdbID)
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
