import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MoviesProvider} from "../../providers/movies/movies";
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import {HttpClient} from "@angular/common/http";
import {StorageProvider} from "../../providers/storage/storage";
import {SocialSharing} from "@ionic-native/social-sharing";

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

    public favorites;
    public keyValue: { Id: string; Title: string; date: Date; type: string; numEpisode: string; numSeason: string; title: string };

    public videoId;
    public trailer;

    public added: boolean = false;

    constructor(public navCtrl: NavController,
                public http: HttpClient,
                public navParams: NavParams,
                public moviesProvider: MoviesProvider,
                private youtube: YoutubeVideoPlayer,
                public storageProvider: StorageProvider,
                private socialSharing: SocialSharing) {
    }

    ionViewWillEnter() {
        const imdbID = this.navParams.get('imdbID');
        const added = this.navParams.get('added');
        this.added = added;
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

                this.storageProvider.get('favorites').then((data) => {
                    this.favorites = data;

                    if (data != null) {
                        for (let item of this.favorites) {
                            if (item.Id == this.details.imdbID)
                                this.added = true;
                        }
                    }
                });
            });
    }

    ionViewDidLoad() {

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

    addToFavorites() {
        this.storageProvider.get('favorites').then((val) => {
            this.favorites = val;
            if (!this.favorites)
                this.favorites = [];

            this.keyValue = {
                'Id': this.details.imdbID,
                'Title': this.details.Title,
                'date': new Date(),
                'type': 'Film',
                'numEpisode': null,
                'numSeason': null,
                'title': null
            };

            this.favorites.push(this.keyValue);
            this.storageProvider.set('favorites', this.favorites);

            this.added = true;
        });
    }

    removeFromList(item: string) {
        this.storageProvider.get('favorites').then((data) => {
            this.favorites = data;
            this.favorites.splice(this.favorites.indexOf(item), 1);
            this.storageProvider.set('favorites', this.favorites);
            this.added = false;
        });
    }

    downloadImg(poster: string) {
        this.socialSharing.share(poster).then();
    }

}
