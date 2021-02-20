import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import { db } from "./firebase";
import firebase from "firebase";
import { AiOutlineLike } from "react-icons/ai";

function Post({ postId, username, user, caption, imageUrl, likess, dislikes }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likesUser, setLikesUser] = useState([]);

  const setLikesHandlerr = () => {
    if (!likesUser.length) {
      db.collection("posts")
        .doc(postId)
        .collection("likeUser")
        .doc(user.email)
        .set({
          likeState: true,
          emailId: user.email
        });
      db.collection("posts")
        .doc(postId)
        .update({
          likess: likess + 1
        });
    }

    const ref = db
      .collection("posts")
      .doc(postId)
      .collection("likeUser")
      .doc(user.email);

    ref.get().then((doc) => {
      if (doc.exists) {
        likesUser.forEach((item) => {
          if (item.emailId === user.email) {
            if (item.likeState === false) {
              db.collection("posts")
                .doc(postId)
                .collection("likeUser")
                .doc(user.email)
                .update({
                  likeState: true
                });
              db.collection("posts")
                .doc(postId)
                .update({
                  likess: likess + 1
                });
            } else {
              db.collection("posts")
                .doc(postId)
                .collection("likeUser")
                .doc(user.email)
                .update({
                  likeState: false
                });
              db.collection("posts")
                .doc(postId)
                .update({
                  likess: likess - 1
                });
            }
          }
        });
      } else {
        db.collection("posts")
          .doc(postId)
          .collection("likeUser")
          .doc(user.email)
          .set({
            likeState: true,
            emailId: user.email
          });
        db.collection("posts")
          .doc(postId)
          .update({
            likess: likess + 1
          });
      }
    });
  };

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("likeUser")
        .onSnapshot((snapshot) => {
          setLikesUser(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

<<<<<<< HEAD
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment("");
  };
=======
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
>>>>>>> 4831247cd53a99b2a1e44308ae63b608bebb9644

  return (
    <div className="post">
      <div className="post_header">
        <Avatar className="post_avatar" src={imageUrl} alt="ima of dance" />
        <h3>{username}</h3>
      </div>
      <img className="post_image" src={imageUrl} alt="ima of dance" />
      <div className="post_like">
        {user && (
          <AiOutlineLike
            className="like"
            onClick={setLikesHandlerr}
            size="25px"
          />
        )}
        <h4>{likess}</h4>
      </div>
      <h4 className="post_text">
        <strong>{username}</strong> {caption}
      </h4>

      <div className="post_comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="post_commentBox">
          <input
            className="post_input"
            placeholder="Add a comment"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
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
