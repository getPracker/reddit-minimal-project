import React, { useState } from "react";
import moment from 'moment';
import { TiArrowDownOutline, TiArrowDownThick, TiArrowUpOutline, TiArrowUpThick, TiMessage } from "react-icons/ti";
import shortenNumber from "../../utils/shortenNumber";
import Comment from "../Comment/Comment";
import Skeleton from 'react-loading-skeleton';
import './Post.css';

const Post = ({post, onToggleComments}) => {
  const [voteValue, setVoteValue] = useState(0);

  const onHandleVote = (newValue) => {
    if(newValue === voteValue){
      setVoteValue(0);
    }else if(newValue === 1){
      setVoteValue(1);
    }else{
      setVoteValue(-1);
    }
  }

  const renderUpVote = () => {
    return voteValue === 1 ? <TiArrowUpThick className="icon-action" /> : <TiArrowUpOutline className="icon-action" />;
  }

  const renderDownVote = () => {
    return voteValue === -1 ? <TiArrowDownThick className="icon-action" /> : <TiArrowDownOutline className="icon-action" />;
  }

  const getVoteType = ()=>{
    if (voteValue === 1) return  "up-vote";
    if (voteValue === -1) return "down-vote";
    return '';
  };

  const renderComments = ()=>{
    if(post.errorComments){
      return (
        <div>
          <h3>Error loading comments!!!</h3>
        </div>
      );
    }

    if(postMessage.loadingComments) {
      return (
        <div>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
        </div>
      )
    };

    if(post.showingComments){
      return (
        <div>
          {post.comments.map((comment)=>(
            <Comment comment={comment} key={comment.id} />
            ))}
        </div>
      );
    }

    return null;
  };


  return (
    <article key={post.id}>
      <div className="post-wrapper">
        <div className="post-votes-container">
          <button type="button" className={`icon-action-button up-vote ${voteValue === 1 && 'active'}`}
            onClick={()=> onHandleVote(1)}
            aria-label="Up vote"
          >
            {renderUpVote()}
          </button>
          <p className={`post-votes-value ${getVoteType()}`}>
            {shortenNumber(post.ups, 1)}
          </p>
          <button type="button" className={`icon-action-button down-vote ${voteValue === -1 && 'active'}`}
            onClick={()=> onHandleVote(-1)}
            aria-label="Down vote"
          >
            {renderDownVote()}
          </button>
        </div>
        <div className="post-container">
          <h3 className="post-title">{post.title}</h3>

          <div className="post-image-container">
            <img src={post.url} alt="" className="post-image"/>
          </div>

          <div className="post-details">
            <span className="author-details">{post.author}</span>
          
            <span>{moment.unix(post.created_utc).fromNow()}</span>
            <span className="post-comments-container">
              <button type="button" className={`icon-action-button ${
                post.showingComments && 'showing-comments'
              }`}
              onClick={()=> onToggleComments(post.permalink)}
              >
                <TiMessage className="icon-action"/>
              </button>
              {shortenNumber(post.num_comments, 1)}
            </span>
          </div>
          {renderComments()}
        </div>
      </div>
    </article>
  )
};

export default Post;
