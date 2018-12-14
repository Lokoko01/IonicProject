import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MoviesProvider} from "../../providers/movies/movies";
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the MovieDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const YoutubeAPI = 'AIzaSyDgRvadeoQ9K3ZMi4r2tjv61hRUVmtquas';

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

    public videoId;
    public trailer;

    constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, public moviesProvider: MoviesProvider, private youtube: YoutubeVideoPlayer) {
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

                this.getMovieTrailer(this.details.Title)
                    .then(data => {
                        this.trailer = data;
                        this.videoId = this.trailer.items[0].id.videoId;
                    });
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

    getMovieTrailer(movieTitle: string) {
        return new Promise(resolve => {
            this.http.get(
                "https://www.googleapis.com/youtube/v3/search?part=snippet&key=" +
                YoutubeAPI +
                "&q=" + movieTitle + "%20trailer&maxResults=1")
                .subscribe(data => {
                    resolve(data);
                }, err => {
                    console.log(err);
                });
        })
    }

    openYoutubeTrailer() {
        this.youtube.openVideo(this.videoId);
    }

}
