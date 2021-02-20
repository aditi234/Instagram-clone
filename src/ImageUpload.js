import React,{useState} from 'react';
import {storage, db} from './firebase';
import firebase from "firebase";
import './ImageUpload.css';

function ImageUpload({username,setPostAdd}){
    const [caption, setCaption]=useState('');
    const [progress, setProgress]=useState(0);
    const [image, setImage]=useState(null);

    const handleChange=(e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }

    const handleUpload=()=>{
      setPostAdd(false);
      const uploadTask=storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
          "state_changed",
          (snapshot)=>{
              const progress= Math.round(
                  (snapshot.bytesTransferred/snapshot.totalBytes)*1000
              );
              setProgress(progress);
          },
          (error)=>{
              console.log(error);
              alert(error.message);
          },
          () => {
              storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then((url) => {
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl:url,
                        username:username,
                        likess:0
                    });

                    setProgress(0);
                    setCaption("");
                    setImage(null);
                })
          }
      )

    }

    const enabled = caption.length > 0;

    return(
        <div className="imageupload">
            <progress value={progress} max="100"/>
            <input type="text" placeholder='Enter a caption....' onChange={event=>setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handleChange} />
            <button className="upload" onClick={handleUpload} disabled={!enabled}>
                Upload
            </button>
        </div>

    )
}

export default ImageUpload;