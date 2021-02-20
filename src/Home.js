import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import Post from "./Post";
import ImageUpload from "./ImageUpload";
import { auth, db } from "./firebase";
// import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import { Avatar } from "@material-ui/core";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// const useStyles = makeStyles((theme) => ({
//     paper: {
//         position: "absolute",
//         width: 400,
//         backgroundColor: theme.palette.background.paper,
//         border: "2px solid #000",
//         boxShadow: theme.shadows[5],
//         padding: theme.spacing(2, 4, 3)
//     }
// }));

function Home({ user, setUsername }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [postAdd, setPostAdd] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    // const classes = useStyles();
    const [posts, setPosts] = useState([]);

    const { push } = useHistory();

    useEffect(() => {
        db.collection("posts")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setPosts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        post: doc.data()
                    }))
                );
            });
    }, []);

    const login_func = () => {
        auth.signOut();
        push("/");
        setUsername("");
    };

    const setPostAddHandler = () => {
        setAnchorEl(null);
        setPostAdd(true);
    }


    return (
        <div className="App">
            <div className="app__header">
                <img
                    className="app__headerImage"
                    src={logo}
                    alt="instagram logo"
                    width="110px"
                    height="55x"
                />
                <div>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <Avatar className="post_avatar" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="ima of dance" />
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={setPostAddHandler}>Upload Post</MenuItem>
                        <MenuItem onClick={login_func}>Logout</MenuItem>
                    </Menu>
                </div>

            </div>

            <div className="app_posts">
                {postAdd && (user?.displayName ? (
                    <ImageUpload username={user.displayName} setPostAdd={setPostAdd} />
                ) : (
                        <h3>Sorry you need to login to upload</h3>
                    ))}

                {posts.map(({ id, post }) => (
                    <Post
                        key={id}
                        postId={id}
                        username={post.username}
                        user={user}
                        caption={post.caption}
                        imageUrl={post.imageUrl}
                        likess={post.likess}
                        dislikes={post.dislikes}
                    />
                ))}
            </div>

        </div>
    );
}

export default Home;
