import * as tweetActions from '../actions/tweets';


export interface State {
  tweets: any[];
}

const initialState: State = {
  tweets: [],
};

export function reducer(state = initialState, action: tweetActions.Actions): State {
  switch (action.type) {
    case tweetActions.NEW_TWEET: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
}


export const tweets = (state: State) => state.tweets;
