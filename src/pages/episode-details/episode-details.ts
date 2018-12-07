import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SeriesProvider} from "../../providers/series/series";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public seriesProvider: SeriesProvider) {
  }

  ionViewDidLoad() {
    const numEpisode = this.navParams.get('numEpisode');
    const numSeason = this.navParams.get('numSeason');
    const title = this.navParams.get('title');
    this.seriesProvider.getEpisodeDetails(numEpisode, numSeason, title)
        .then(data => {
          this.details = data;
        });
  }

}
