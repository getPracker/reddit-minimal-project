import { createSelector, createSlice } from '@reduxjs/toolkit';
import { getComments, getPosts } from '../api/reddit';

const redditSlice = createSlice({
    name: 'reddit',
    initialState: {
        posts: [],
        hasError: false,
        isLoading: false,
        searchTerm: '',
        selectedSubreddit: '/r/pics/'
    },
    reducers: {
        startGettingPosts(state){
            state.hasError = false;
            state.isLoading = true;
        },
        getPostsSuccess(state, action){
            state.isLoading = false;
            state.posts = action.payload;
        },
        getPostsFailed(state){
            state.hasError = true;
            state.isLoading = false;
        },
        setSearchTerm(state, action){
            state.searchTerm = action.payload;
        },
        startGettingComments(state, action){
            state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
            if(!state.posts[action.payload].showingComments){
                return;
            }
            state.posts[action.payload].errorComments = false;
            state.posts[action.payload].loadingComments = true;
        },
        getCommentsSuccess(state, action){
            state.posts[action.payload.index].loadingComments = false;
            state.posts[action.payload.index].comments = action.payload.comments;
        },
        getCommentsFailed(state, action){
            state.posts[action.payload].errorComments = true;
            state.posts[action.payload].loadingComments = false;
        },
        setSelectedSubreddit(state, action){
            state.selectedSubreddit = action.payload;
            state.searchTerm = '';
        },
        toggleShowingComments(state, action){
            state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
        }
    }
});

// export action items
export const {
    startGettingPosts,
    getPostsFailed,
    getPostsSuccess,
    setSearchTerm,
    setSelectedSubreddit,
    startGettingComments,
    getCommentsFailed,
    getCommentsSuccess,
} = redditSlice.actions;

// export reducer
export default redditSlice.reducer;

// thunks
// fetch posts
export const fetchPosts = (selectedSubreddit) => async (dispatch) =>{
    try{
        dispatch(startGettingPosts());
        const posts = await getPosts(selectedSubreddit);
        const postsWithComments = posts.map((post)=>{
            return {
            ...post,
            showingComments: false,
            loadingComments: false,
            errorComments: false,
            comments: [],
            }
        });
        dispatch(getPostsSuccess(postsWithComments));
    }catch(err){
        dispatch(getPostsFailed());
        console.error(err);
    }
}
// fetch comments
export const fetchComments = (index, permalink)=> async(dispatch)=>{
    try{
        dispatch(startGettingComments(index));
        const comments = await getComments(permalink);
        dispatch(getCommentsSuccess({index, comments}));
    }catch(err){
        dispatch(getCommentsFailed(index));
        console.error(err);
    }
};

// selectors
const selectPosts = (state) => state.reddit.posts;
const selectSearchTerm = (state) => state.reddit.searchTerm;
export const selectSelectedSubreddit = (state) => state.reddit.selectedSubreddit;

export const selectFilteredPosts = createSelector(
    [selectPosts, selectSearchTerm],
    (posts, searchTerm)=> {
        if(searchTerm !== ''){
            return posts.filter((post)=>{
                return post.title.toLowerCase().includes(searchTerm.toLowerCase())
            });
        }
        return posts;
    }
);