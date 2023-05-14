'use client'
import { logout } from "@/redux/authSlice"
import { useDispatch } from "react-redux"
import HomePartial from "../homePartial/page"
import Webcam from "react-webcam"
import { useRef, useState } from "react"

export default function Dashboard({userToken, email}){
    const webcamRef = useRef(null)
    const [recording, setRecording] = useState(false)
    const [recordedVideo, setRecordedVideo] = useState(null)

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
      
        mediaRecorder.addEventListener('stop', () => {
          const recordedBlob = new Blob(chunks, { type: 'video/webm' });
          setRecordedVideo(recordedBlob);
          setRecording(false);
        });
      
        mediaRecorder.start();
        setTimeout(() => {
          mediaRecorder.stop();
        }, 7000);
      };
      
      const stopRecording = () => {
        setRecording(false);
      };
      
    
    return (
        <div>
            <HomePartial email={email}></HomePartial>
            <h1>Home</h1>
            <Webcam ref={webcamRef} audio={true} video={true}></Webcam>

            {recording ? (
                <button onClick={stopRecording}>Stop Recording</button>
            ) : (
                <button onClick={startRecording}>Start Recording</button>
            )}

            {recordedVideo && (
                <video controls>
                    <source src={URL.createObjectURL(recordedVideo)} type="video/webm" />
                </video>
            )}
        </div>
    )
}