'use client'
import HomePartial from "../homePartial/page"
import Image from 'next/image'
import { useEffect } from "react"
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { useDispatch, useSelector } from "react-redux"
import { generateArt, loadData, saveOpenAiKey, changeIsProcessing, saveImage, selectNewImages, selectOpenAiKey, selectIsProcessing, selectShortApiKey } from "@/redux/firestoreSlice"
import { useFormik } from "formik"
import { selectUserToken } from "@/redux/authSlice"

export default function Dashboard(){
    const storage = getStorage()
    const dispatch = useDispatch()

    const userToken = useSelector(selectUserToken)
    const new_images = useSelector(selectNewImages)
    const openaikey = useSelector(selectOpenAiKey)
    const shortApiKey = useSelector(selectShortApiKey)
    const isProcessing = useSelector(selectIsProcessing)
  
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

    const video_formik = useFormik({
      initialValues:{
        file: null
      },
      onSubmit: async(values) => {
        if(openaikey != ""){
          document.getElementById("generate_art_submit").disabled = true
          dispatch(changeIsProcessing({
            isProcessing: true
          }))

          const storageRef = ref(storage, 'recordings/' + userToken + '.mp4')
          await uploadBytes(storageRef, values.file)

          const downloadUrl = await getDownloadURL(storageRef)
          const encodedURL = encodeURIComponent(downloadUrl)

          dispatch(generateArt({
            userId: userToken,
            downloadUrl: encodedURL,
            apikey: openaikey
          })) 
        }else{
          alert("Please enter valid openai api key")
        }
      }
    })

    const bookmark = (url, title) =>{
      document.getElementById("saveButton" + url).disabled = true
      dispatch(saveImage({
        userId: userToken,
        url: url,
        title: title
      }))
    }
    
    useEffect(() => {
        dispatch(loadData(userToken))
    }, [])


    return (
        <div>
            <HomePartial></HomePartial>
            <div>
            </div>
            <div className="hMainContainer">
                <form className = "apikeyContainer" onSubmit={formik.handleSubmit}>
                    <div className="vContainer">
                        
                        <label className="text formText">Current Openai key: {shortApiKey}</label>

                        <label className="text formText">Change openai key:</label>
                        <input className="text formText formInput" type='openaikey' id = "openaikey" name = "openaikey" required onChange={formik.handleChange} value={formik.values.openaikey} ></input>    
                    
                        <button className = "navButton formText" type = "submit">Submit</button>
                    </div>
                </form>
                <div className="recordingContainer">
                  <form onSubmit={video_formik.handleSubmit}>
                    <div className="vContainer">
                      <label className="text formText">Upload your file here</label>
                      <label className="text formText">Please enter a short mp4 clip under 15mb in size ~ 10s</label>
                      <input className="text formText formInput" id = "file" name="file" type="file" accept="video/mp4" required onChange={(event) => {
                        if(event.currentTarget.files[0].size > 0 && event.currentTarget.files[0].size < (1024*1024*15)){
                          video_formik.setFieldValue("file", event.currentTarget.files[0])
                        }
                        else{
                          alert('Please enter a mp4 file less than 10mb in size')
                          document.getElementById("file").value = ""
                        }
                      }}></input>

                      <button id="generate_art_submit" className="navButton formText" type="submit">Create Art!</button>

                    </div>
                  </form>
              </div>                
            </div>
            <div className="imageContainer vContainer">
              {isProcessing ? (
                <div className="vContainer">
                  <label className="text formText">Generating art...</label>
                  <label className="text formText">This is going to take a minute lol</label>
                  <Image src="/loading.gif" width={150} height={150} alt="This might take a minute..."></Image>
                </div>
                ):(
                <div className="vContainer">
                  {new_images.length > 0 && new_images.map((image) => {
                    return(
                      <div key={image.link} className="hImageContainer">
                        <button id={"saveButton" + image.link} className="navButton formText" onClick={() => bookmark(image.link, image.title)}>Save Image</button>
                        <img className="images" width="400px" src={image.link}></img>
                        <label className="text formText bold">{image.title}</label>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
        </div>
    )
}