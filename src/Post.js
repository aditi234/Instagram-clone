import React, { useEffect, useState } from 'react';
import './Post.css';
import { Avatar } from '@material-ui/core';
import { db } from './firebase';
import firebase from 'firebase';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';

function Post({postId,username, user, caption, imageUrl}){
    const [comments, setComments]=useState([]);
    const [comment, setComment]=useState('');
    const [like, setLike]=useState(0);
    var [likes, setLikes]=useState(255);
    
    setLikes=setLikes.bind();

    const setLikeHandler=()=>{
        if(like)
        {
            setLike(0);
        }
        else
        {
            setLike(1);
        }

        if(like)
        {
            setLikes(likes-1);
        }
        else
        {
            setLikes(likes+1);
        }
    }

    
    useEffect(()=>{
        let unsubscribe;
        if(postId){
            unsubscribe=db
               .collection("posts")
               .doc(postId)
               .collection("comments")
               .orderBy('timestamp','desc')
               .onSnapshot((snapshot)=>{
                   setComments(snapshot.docs.map((doc)=>doc.data()))
               });
        }
        return()=>{
            unsubscribe();
        }
    }, [postId] );

    const postComment=(e)=>{
        e.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
           text: comment,
           username:user.displayName,
           timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

    return(
        <div className="post">
            <div className="post_header">
                <Avatar className="post_avatar" src={imageUrl} alt="ima of dance"/>
                <h3>{username}</h3>
            </div>
            <img className="post_image" src={imageUrl} alt="ima of dance"/>
            <div className="post_like">
                {user && (like? (
                     <AiTwotoneHeart onClick={setLikeHandler} size="25px"/>
                ):
                (
                    <AiOutlineHeart onClick={setLikeHandler} size="25px"/>
                ))}
              
              <h4>{likes}</h4>
            </div>
            <h4 className="post_text"><strong>{username}</strong> {caption}</h4>
             
            <div className="post_comments">
              {comments.map((comment)=>(
                   <p>
                      <strong>{comment.username}</strong> {comment.text}
                   </p>
               ))}
            </div>
            {user &&(
               <form className="post_commentBox">
               <input
                   className="post_input"
                   placeholder="Add a comment"
                   type="text"
                   value={comment}
                   onChange={(e)=> setComment(e.target.value)}
                />
                <button
                  className="post_button"
                  disabled={!comment}
                  type="submit"
                  onClick={postComment}
                  >
                      Post
                  </button>
               </form>
            )} 
        </div>
    );
}


export default Post;
