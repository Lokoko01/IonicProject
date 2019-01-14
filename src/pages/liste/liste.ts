import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {MovieDetailsPage} from "../movie-details/movie-details";
import {EpisodeDetailsPage} from "../episode-details/episode-details";
import {SerieDetailsPage} from "../serie-details/serie-details";
import {SocialSharing} from '@ionic-native/social-sharing';
import JSON2CSV from 'json-2-csv';
import {File} from '@ionic-native/file';

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
                public storageProvider: StorageProvider,
                private socialSharing: SocialSharing,
                private file: File) {
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
            this.navCtrl.push(EpisodeDetailsPage, {
                numEpisode: numEpisode,
                numSeason: numSeason,
                title: title,
                added: true
            });
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
        if (this.listeLength == 0)
            this.canRemoveAll = false;
    }

    removeAll() {
        this.favorites = null;
        this.storageProvider.clear();
        this.listeLength = 0;
        this.canRemoveAll = false;
    }

    share(type: string) {
        /*let converter = new JSON2CSV();
        let csvList = null;
        converter.json2csv(this.favorites, csvList);*/
        /*let file;
        this.file.writeFile(this.file.dataDirectory, 'liste_favoris.json', this.favorites, {replace: true}).then((data) => {
            file = data;
        });
        console.log(file);*/
        /*if (type == 'json') {
            this.socialSharing.share(
                'Voici ma liste des favoris',
                'Liste des favoris',
                this.file.getFile(this.file.resolveDirectoryUrl(this.file.dataDirectory), 'liste_favoris.json', {}))
                .then(() => {
                }).catch(() => {
            });
        } else if (type == 'csv') {
            this.socialSharing.share(null, null, this.favorites)
                .then(() => {
                }).catch(() => {
            });
        }*/
    }
}
