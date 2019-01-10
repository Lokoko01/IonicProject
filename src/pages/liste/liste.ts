import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {SeasonDetailsPage} from "../season-details/season-details";
import {MovieDetailsPage} from "../movie-details/movie-details";
import {EpisodeDetailsPage} from "../episode-details/episode-details";
import {SerieDetailsPage} from "../serie-details/serie-details";

/**
 * Generated class for the ListePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-liste',
    templateUrl: 'liste.html',
})
export class ListePage {

    public favorites;
    public listeLength: number;
    canRemoveAll: boolean = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public storageProvider: StorageProvider) {
    }

    ionViewWillEnter() {
        this.storageProvider.get('favorites').then((data) => {
            this.favorites = data;
            this.listeLength = 0;
            if (data != null) {
                for (let item of data) {
                    this.listeLength++;
                }
            }

            if (this.listeLength != 0)
                this.canRemoveAll = true;
        });
    }

    goTo(Id?: string, type?: string, numEpisode?: string, numSeason?: string, title?: string) {
        if (type == "Film")
            this.navCtrl.push(MovieDetailsPage, {imdbID: Id, added: true});
        else if (type == 'Serie')
            this.navCtrl.push(SerieDetailsPage, {imdbID: Id, added: true});
        else if (type == 'Episode')
            this.navCtrl.push(EpisodeDetailsPage, {numEpisode: numEpisode, numSeason: numSeason, title: title, added: true});
    }

    removeItem(item: any) {
        this.favorites.splice(this.favorites.indexOf(item), 1);
        this.storageProvider.set('favorites', this.favorites);
        this.listeLength = 0;
        if (this.favorites != null) {
            for (let item of this.favorites) {
                this.listeLength++;
            }
        }
    }

    removeAll() {
        this.favorites = null;
        this.storageProvider.clear();
        this.listeLength = 0;
    }
}
