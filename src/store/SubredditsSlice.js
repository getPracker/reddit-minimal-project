import { createSlice } from '@reduxjs/toolkit';
import { getSubreddits } from '../api/reddit';

const SubredditSlice = createSlice({
    name: "Subreddits",
    initialState: {
        subreddits: [],
        error: false,
        isLoading: false
    },
    reducers: {
        startGetSubreddits(state){
            state.error = false;
            state.isLoading = true;
        },
        getSubredditsSuccess(state, action){
            state.isLoading = false;
            state.subreddits = action.payload;
        },
        getSubredditsFailed(state){
            state.error = true;
            state.isLoading = false;
        }
    }
});

export const {
    getSubredditsFailed,
    getSubredditsSuccess,
    startGetSubreddits
} = SubredditSlice.actions;

// Reducer
export default SubredditSlice.reducer;
// Thunks
export const fetchSubreddits = () => async(dispatch) =>{
    try{
        dispatch(startGetSubreddits());
        const subreddits = await getSubreddits();
        dispatch(getSubredditsSuccess(subreddits));
    }catch(err){
        dispatch(getSubredditsFailed());
    }
}
// Selectors
export const selectSubreddits = (state) => state.subreddits.subreddits;
