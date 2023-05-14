'use client'
import HomePartial from "../homePartial/page"
import Webcam from "react-webcam"
import { useRef, useState } from "react"
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'

export default function Dashboard({userToken, email}){
    const webcamRef = useRef(null)
    const [recording, setRecording] = useState(false)

    const storage = getStorage()

    const startRecording = () => {
        setRecording(true);
        const chunks = [];
        const options = { mimeType: 'video/webm' };
      
        const mediaRecorder = new MediaRecorder(webcamRef.current.stream, options);
        mediaRecorder.addEventListener('dataavailable', (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        });
      
        mediaRecorder.addEventListener('stop', async () => {
          const recordedBlob = new Blob(chunks, { type: 'video/webm' });

          const storageRef = ref(storage, 'recordings/' + userToken + '/video.webm')
          await uploadBytes(storageRef, recordedBlob)

          const downloadUrl = await getDownloadURL(storageRef)
          console.log(downloadUrl)

          setRecording(false);
        });
      
        mediaRecorder.start();
        setTimeout(() => {
          mediaRecorder.stop();
        }, 8000);
      };
      
    return (
        <div>
            <HomePartial email={email}></HomePartial>
            <h1>Home</h1>
            <Webcam ref={webcamRef} audio={true} video={true}></Webcam>

            {recording == false ? 
                (<button onClick={startRecording}>Start Recording</button>):(
                    <label>Recording</label>
                )
            }
            
        </div>
    )
}