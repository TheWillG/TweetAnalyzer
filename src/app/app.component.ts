import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { tweets } from './store/reducers/tweets';
import { AppService } from './services/app.service';
import { CountryData } from './models/countryData.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tweets$: Observable<any>;
  countries: CountryData[] = [];
  // view: any[] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = '# Tweets';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private store: Store<any>, private appService: AppService) {
    this.tweets$ = store.select(tweets);
  }

  ngOnInit() {
    this.appService.setupPubnub();
    this.tweets$.subscribe(tweet => {
      this.handleTweet(tweet);
    });
  }

  handleTweet(tweet: any) {
    if (tweet.message && tweet.message.place) {
      const countryCode = tweet.message.place.country_code;
      const existingCountryDP = this.countries.find(dp => dp.name === countryCode);
      if (existingCountryDP) {
        existingCountryDP.value += 1;
      } else {
        const newCountry = { name: countryCode, value: 1 };
        this.countries.push(newCountry);
      }
      this.countries = [...this.countries];
      this.countries.sort((a, b) => b.value - a.value);
    }
    console.log('this.countries', this.countries);
  }
}
