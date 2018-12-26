import { Action } from '@ngrx/store';

export const NEW_TWEET = '[Tweets] New Tweet';

export class NewTweetAction implements Action {
  readonly type = NEW_TWEET;

  constructor(public payload: any) { }
}

export type Actions
  =  NewTweetAction;
