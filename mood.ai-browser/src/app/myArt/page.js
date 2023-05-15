'use client'
import { useDispatch } from "react-redux"
import '../css/shared.css'
import MyArtPartial from "../myArtPartial/page"

export default function MyArt({image_links, email}){
    
    const dispatch = useDispatch()
  
    return (
        <div>
            <MyArtPartial email={email}></MyArtPartial>
            <div className="vContainer">
                <label className="text subTitle">My Art</label>
                <div className="imgContainer">
                    {image_links.map((image) => {
                        return (
                            <div className="vContainer">
                                <label className="text formText bold">{image.name}</label>
                                <img width="400px" src={image.url}></img>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}