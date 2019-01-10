import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SeriesProvider} from "../../providers/series/series";
import {SeasonDetailsPage} from "../season-details/season-details";
import {StorageProvider} from "../../providers/storage/storage";

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

    public favorites;
    public keyValue: { Id: string; Title: string; date: Date; type: string; numEpisode: string; numSeason: string; title: string };
    public added: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public seriesProvider: SeriesProvider,
                public storageProvider: StorageProvider) {

    }

    ionViewWillEnter() {
        const imdbID = this.navParams.get('imdbID');
        const added = this.navParams.get('added');
        this.added = added;
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
                'type': 'Serie',
                'numEpisode': null,
                'numSeason': null,
                'title': null
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
