import {Component} from '@angular/core';
import {MoviesProvider} from "../../providers/movies/movies";
import {HttpClient} from "@angular/common/http";
import {NavController} from "ionic-angular";
import {MovieDetailsPage} from "../movie-details/movie-details";

/**
 * Generated class for the FilmsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-films',
    templateUrl: 'films.html',
})
export class FilmsPage {

    movies;
    public isSearchbarOpened = false;

    constructor(public navCtrl: NavController, public moviesProvider: MoviesProvider, public http: HttpClient) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FilmsPage');
    }

    searchMovie(search: string) {
        this.reset();
        this.moviesProvider.searchMovie(search)
            .then(data => {
                this.movies = data;
                if (this.movies != null) {
                    this.movies.Poster = 'http://img.omdbapi.com/?apikey=75522b56&i=' + this.movies.imdbID;
                }
            });
    }

    private reset() {
        this.movies = [];
    }

    goToDetails(imdbID: string) {
        this.navCtrl.push(MovieDetailsPage, {imdbID: imdbID});
    }
}
