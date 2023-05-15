'use client'
import HomePartial from "../homePartial/page"
import Webcam from "react-webcam"
import { useEffect, useRef, useState } from "react"
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { useDispatch } from "react-redux"
import { loadData, saveOpenAiKey, validateOpenAiKey } from "@/redux/firestoreSlice"
import { Formik, useFormik } from "formik"

export default function Dashboard({userToken, email, image_links, actualOpenAiKey, shortApiKey}){
    const webcamRef = useRef(null)
    const [recording, setRecording] = useState(false)
    const storage = getStorage()

    const formik = useFormik({
        initialValues:{
            openaikey: '',
        },
        onSubmit: values => {
          dispatch(saveOpenAiKey({
            userToken: userToken, 
            openaikey: values.openaikey
          }))
        }
    })


    const dispatch = useDispatch()

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

    useEffect(() => {
        dispatch(loadData(userToken))
    }, [])


    return (
        <div>
            <HomePartial email={email}></HomePartial>

            <div className="hMainContainer">
                <form className = "apikeyContainer" onSubmit={formik.handleSubmit}>
                    <div className="vContainer">
                        
                        <label className="text formText">Current Openai key: {shortApiKey}</label>

                        <label className="text formText">Change openai key:</label>
                        <input className="text formText formInput" type='openaikey' id = "openaikey" name = "openaikey" onChange={formik.handleChange} value={formik.values.openaikey} required></input>    
                    
                        <button className = "navButton formText" type = "submit">submit</button>
                    </div>
                </form>
                <div className="recordingContainer vContainer">
                  
                  {recording == false ? 
                      (<button className="navButton formText" onClick={startRecording}>Start Recording</button>):(
                          <label className="text formText">Recording</label>
                      )
                  }

                  <Webcam ref={webcamRef} audio={true} video="true"></Webcam>
              </div>                
            </div>
        </div>
    )
}