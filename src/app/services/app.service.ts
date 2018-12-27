import { Injectable, OnInit } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';

import * as tweetActions from '../store/actions/tweets';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  newTweetResponse = this.socket.fromEvent<any>('newTweet');

  constructor(private pubnub: PubNubAngular, private store: Store<any>, private socket: Socket) { }

  async getTweets(filter = ''): Promise<void> {
    this.socket.disconnect();
    this.socket.connect();
    this.socket.emit('getTweets', filter);
    this.newTweetResponse.subscribe(msg => {
      this.store.dispatch(new tweetActions.NewTweetAction(msg));
    });
  }
}
