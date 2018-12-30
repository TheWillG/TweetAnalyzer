import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';

import * as tweetActions from '../store/actions/tweets';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  newTweetResponse = this.socket.fromEvent<any>('newTweet');

  constructor(private store: Store<any>, private socket: Socket) { }

  /**
   * Emit new socket message to request tweets by hashtag filter.
   * When new socket message received, dispatch NEW_TWEET action.
   * @param filter string
   */
  async getTweets(filter = ''): Promise<void> {
    this.socket.disconnect();
    this.socket.connect();
    this.socket.emit('getTweets', filter);
    this.newTweetResponse.subscribe(msg => {
      this.store.dispatch(new tweetActions.NewTweetAction(msg));
    });
  }
}
