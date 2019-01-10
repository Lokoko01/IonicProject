import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SeriesProvider} from "../../providers/series/series";
import {YoutubeVideoPlayer} from "@ionic-native/youtube-video-player";
import {StorageProvider} from "../../providers/storage/storage";

/**
 * Generated class for the EpisodeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-episode-details',
    templateUrl: 'episode-details.html',
})
export class EpisodeDetailsPage {

    details;

    public favorites;
    public keyValue: { Id: string; Title: string; date: Date; type: string; numEpisode: string; numSeason: string; title: string };
    numEpisode: string;
    numSeason: string;
    title: string;
    public added: boolean = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public seriesProvider: SeriesProvider,
                public storageProvider: StorageProvider) {
    }

    ionViewWillEnter() {
        const numEpisode = this.navParams.get('numEpisode');
        const numSeason = this.navParams.get('numSeason');
        const title = this.navParams.get('title');
        const added = this.navParams.get('added');

        this.numEpisode = numEpisode;
        this.numSeason = numSeason;
        this.title = title;
        this.added = added;

        this.seriesProvider.getEpisodeDetails(numEpisode, numSeason, title)
            .then(data => {
                this.details = data;

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

    addToFavorites() {
        this.storageProvider.get('favorites').then((val) => {
            this.favorites = val;
            if (!this.favorites)
                this.favorites = [];

            this.keyValue = {
                'Id': this.details.imdbID,
                'Title': this.details.Title,
                'date': new Date(),
                'type': 'Episode',
                'numEpisode': this.numEpisode,
                'numSeason': this.numSeason,
                'title': this.title
            };

            this.favorites.push(this.keyValue);
            this.storageProvider.set('favorites', this.favorites);

            this.added = true;
        })
    }

    removeFromList(item: string) {
        this.storageProvider.get('favorites').then((data) => {
            this.favorites = data;
            this.favorites.splice(this.favorites.indexOf(item), 1);
            this.storageProvider.set('favorites', this.favorites);
            this.added = false;
        });
    }

}
