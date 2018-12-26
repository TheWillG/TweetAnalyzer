import { Injectable, OnInit } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';

import * as tweetActions from '../store/actions/tweets';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private pubnub: PubNubAngular, private store: Store<any>) {}

  setupPubnub(): void {
    this.pubnub.init({
      subscribeKey: environment.pubnubSubKey
    });
    this.pubnub.subscribe({
      channels: [environment.pubnubTweetChannel], triggerEvents: ['message']
    });

    this.pubnub.getMessage(environment.pubnubTweetChannel, msg => {
      this.store.dispatch(new tweetActions.NewTweetAction(msg));
    });
  }
}
