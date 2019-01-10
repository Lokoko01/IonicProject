import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {FilmsPage} from "../films/films";
import {SeriesPage} from "../series/series";
import {ListePage} from "../liste/liste";

/**
 * Generated class for the TabContentPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-tab-content',
    templateUrl: 'tab-content.html'
})
export class TabContentPage {

    filmsRoot = FilmsPage
    seriesRoot = SeriesPage
    listeRoot = ListePage

    constructor(public navCtrl: NavController) {

    }

}
