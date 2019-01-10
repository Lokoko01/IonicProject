import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {FilmsPage} from "../pages/films/films";
import {SeriesPage} from "../pages/series/series";
import {ListePage} from "../pages/liste/liste";
import {TabContentPage} from "../pages/tab-content/tab-content";
import {MoviesProvider} from '../providers/movies/movies';
import {SeriesProvider} from '../providers/series/series';
import {HttpClientModule} from "@angular/common/http";
import {MovieDetailsPage} from "../pages/movie-details/movie-details";
import {SerieDetailsPage} from "../pages/serie-details/serie-details";
import {SeasonDetailsPage} from "../pages/season-details/season-details";
import {EpisodeDetailsPage} from "../pages/episode-details/episode-details";
import {YoutubeVideoPlayer} from "@ionic-native/youtube-video-player";
import {StorageProvider} from '../providers/storage/storage';
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        FilmsPage,
        SeriesPage,
        ListePage,
        TabContentPage,
        MovieDetailsPage,
        SerieDetailsPage,
        SeasonDetailsPage,
        EpisodeDetailsPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule,
        IonicStorageModule.forRoot(),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        FilmsPage,
        SeriesPage,
        ListePage,
        TabContentPage,
        MovieDetailsPage,
        SerieDetailsPage,
        SeasonDetailsPage,
        EpisodeDetailsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        MoviesProvider,
        SeriesProvider,
        YoutubeVideoPlayer,
        StorageProvider
    ]
})
export class AppModule {
}
