import React,{useState, useEffect} from 'react';
import './App.css';
import logo from './assets/logo.png';
import Post from './Post';
import ImageUpload from './ImageUpload';
import {auth, db} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
// import InstagramEmbed from 'react-instagram-embed';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes=useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [openSignIn, setOpenSignIn]=useState(false);
  const [posts, setPosts]=useState([]);
  const [open, setOpen]=useState(false);
  const [username, setUsername]=useState('');
  const [password, setPassword]=useState('');
  const [email, setEmail]=useState('');
  const [user,setUser]=useState(null);

  useEffect(()=>{
   const unsubscribe=auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        console.log(authUser);
        setUser(authUser);
      }
      else{
        setUser(null);
      }
    })
    return()=>{
      unsubscribe();
    }
  },[user, username]);

  const signUp=(e)=>{
     e.preventDefault();
     auth.createUserWithEmailAndPassword(email,password)
     .then((authUser)=>{
       authUser.user.updateProfile({
         displayName: username
       })
     })
     .catch((error)=>alert(error.message))
  }

  const signIn=(e)=>{
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email,password)
      .catch((error)=>alert(error.message))

    setOpenSignIn(false);  
  }
  
  useEffect(() => {
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id: doc.id,
        post:doc.data()
      })));
    })
  },[]);

  
  return (
    <div className="App">
      <Modal
        open={open}
        onClose={()=> setOpen(false)}
      >
      <div style={modalStyle} className={classes.paper}>
         <form className="app_signup">
         <center>
            <img className="app__headerImage"
             src={logo}
             alt="instagram logo"
             width="110px" height="55x"
             />
        </center>
             <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
             />
             <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
             />
             <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
             />
             <Button type="submit" onClick={signUp}>Sign Up</Button>
         </form>
         
      </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}
      >
      <div style={modalStyle} className={classes.paper}>
         <form className="app_signup">
         <center>
            <img className="app__headerImage"
             src={logo}
             alt="instagram logo"
             width="110px" height="55x"
             />
        </center>
             <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
             />
             <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
             />
             <Button type="submit" onClick={signIn}>Sign In</Button>
         </form>
         
      </div>
      </Modal>

      <div className="app__header">
        <img className="app__headerImage"
             src={logo}
             alt="instagram logo"
             width="110px" height="55x"/>

        {user ? (
               <Button onClick={()=>auth.signOut()}>Logout</Button>
                ):(
                <div className="app_loginContainer">
                   <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
                   <Button onClick={()=>setOpen(true)}>Sign Up</Button>
                 </div>
         )}     
      </div>
      
      <div className="app_posts">
          {posts.map(({id, post})=>(
                <Post key={id} postId={id} username={post.username} user={user} caption={post.caption} imageUrl={post.imageUrl}/>
           ))
          }
      </div>
      
      {/* <InstagramEmbed
  url='https://instagr.am/p/Zw9o4/'
  maxWidth={320}
  hideCaption={false}
  containerTagName='div'
  protocol=''
  injectScript
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
/> */}


{user?.displayName?(
         <ImageUpload username={user.displayName}/>
      ):(
        <h3>Sorry you need to login to upload</h3>
      )}
    </div>
  );
}

export default App;
