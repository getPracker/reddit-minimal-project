import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import PostLoading from '../Post/PostLoading';
import getRandomNumber from "../../utils/getRandomNumber";
import { fetchComments, fetchPosts, selectFilteredPosts, setSearchTerm } from "../../store/redditSlice";
import Post from "../Post/Post";

const Home = () => {
  const dispatch = useDispatch();
  const reddit = useSelector((state)=> state.reddit);
  const { isLoading, hasError, searchTerm, selectedSubreddit } = reddit;
  const posts = useSelector(selectFilteredPosts);

  useEffect(()=>{
    dispatch(fetchPosts(selectedSubreddit));
  }, [selectedSubreddit]);

  const onToggleComments = (index) => {
    const getComments = (permalink) => {
      dispatch(fetchComments(index, permalink));
    };

    return getComments;
  };

  if(isLoading){
    return (
      <h1>
        <PostLoading/>
      </h1>
    );
  }

  if(hasError){
    return (
      <div className="error">
        <h2>Failed to load posts.</h2>
        <button type="button" onClick={()=> dispatch(fetchPosts(selectedSubreddit))}>
          Try again
        </button>
      </div>
    );
  }

  if(posts.length === 0){
    return (
      <div className="error">
        <h2>No posts matching "{searchTerm}"</h2>
        <button type="button" onClick={()=> dispatch(setSearchTerm(''))}>
          Go Home
        </button>
      </div>
    );
  }

  return (
    <>
      {posts.map((post, index) => (
        <Post
        key={post.id}
        post={post}
        onToggleComments={onToggleComments(index)}/>
      ))}
    </>
  )
};

export default Home;
