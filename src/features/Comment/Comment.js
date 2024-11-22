import moment from "moment";
import React from "react"
import ReactMarkDown from 'react-markdown';

const Comment = ({comment}) => {
  return (
    <div className="comment">
        <div className="comment-metadata">
            <span className="comment-author">{comment.author}</span>
            <p className="comment-created-time">
                {moment.unix(comment.created_utc).fromNow()}
            </p>
        </div>
        <ReactMarkDown children={comment.body} />
    </div>
  )
};

export default Comment;
