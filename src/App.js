import React,{useState} from 'react';
import './App.css';
import logo from './assets/logo.png';
import Post from './Post';
import dance from './assets/7893.jpg';

function App() {
  const [posts, setPosts]=useState([
    {
      username="cleverqazi",
      caption="idhu ywuef ferferhfer fyrfkre",
      imageUrl={dance}
    },
    {
      username="cleverqazi",
      caption="idhu ywuef ferferhfer fyrfkre",
      imageUrl={dance}
    },
    {
      username="cleverqazi",
      caption="idhu ywuef ferferhfer fyrfkre",
      imageUrl={dance}
    }
  ]);
  const posts=[];
  posts.append('');
  return (
    <div className="App">
      <div className="app__header">
        <img className="app__headerImage"
             src={logo}
             alt="instagram logo"
             width="110px" height="55x"/>
      </div>
      {posts.map(post=>(
        <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
      ))}
    </div>
  );
}

export default App;
