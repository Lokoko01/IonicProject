import {Component} from '@angular/core';
import {MoviesProvider} from "../../providers/movies/movies";
import {HttpClient} from "@angular/common/http";

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

    constructor(public moviesProvider: MoviesProvider, public http: HttpClient) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FilmsPage');
    }

    searchMovie(search: string) {
        this.reset();
        this.moviesProvider.searchMovie(search)
            .then(data => {
                this.movies = data;
                console.log(this.movies);
            });
    }

    private reset(){
        this.movies = [];
    }

}
