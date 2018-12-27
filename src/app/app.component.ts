import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { tweets } from './store/reducers/tweets';
import { AppService } from './services/app.service';
import { Tweet } from './models/tweets.model';
import { Language } from './models/languages.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  search = '';
  tpm = 0;
  submittedSearch = '';
  languages: Language[] = [];
  tweets$: Observable<any>;
  tweetList: Tweet[] = [];
  tweetPreviews: Tweet[] = [];

  constructor(private store: Store<any>, private appService: AppService) {
    this.tweets$ = store.select(tweets);
  }

  ngOnInit() {
    this.tweets$.subscribe(tweet => {
      if (tweet.filter === this.submittedSearch) {
        this.handleTweet(tweet);
      }
    });
  }

  handleTweet(tweet: any) {
    this.tweetList.push(tweet);
    this.tweetList = [...this.tweetList];
    const list = [...this.tweetList];
    this.tweetPreviews = [...list.reverse().slice(0, 3)];
    this.calculateTpm();
    this.calculateLanguages(tweet);
  }

  calculateTpm(): void {
    if (this.tweetList.length === 0) {
      this.tpm = 0;
    } else if (this.tweetList.length === 1) {
      this.tpm = 1;
    } else {
      const firstTimestamp = this.tweetList[0].timestamp;
      const newestTimestamp = this.tweetList[this.tweetList.length - 1].timestamp;
      const diffSeconds = Math.floor((newestTimestamp - firstTimestamp) / 1000);
      const numTweets = this.tweetList.length;
      this.tpm = Math.floor(numTweets * 60 / diffSeconds);
    }
  }

  calculateLanguages(tweet: Tweet): void {
    const lang = tweet.lang;
    const existingLang = this.languages.find(l => l.name === lang);
    if (existingLang) {
      existingLang.count += 1;
    } else {
      const newLang = {name: lang, count: 1};
      this.languages.push(newLang);
    }
    this.languages = [...this.languages];
    this.languages.sort((a, b) => b.count - a.count);
  }

  fetchTweets() {
    this.tweetList = [];
    this.tweetPreviews = [];
    this.tpm = 0;
    this.submittedSearch = this.search;
    this.appService.getTweets(this.search);
  }
}
