import { combineReducers, configureStore } from "@reduxjs/toolkit";
import subRedditReducer from './SubredditsSlice';
import redditReducer from './redditSlice';

export default configureStore({
    reducer: combineReducers({
        subreddits: subRedditReducer,
        reddit: redditReducer
    }),
});