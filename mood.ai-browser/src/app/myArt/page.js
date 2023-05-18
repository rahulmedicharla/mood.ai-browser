'use client'
import { useDispatch, useSelector } from "react-redux"
import '../css/shared.css'
import MyArtPartial from "../myArtPartial/page"
import { selectImageLinks } from "@/redux/firestoreSlice"

export default function MyArt(){
    const image_links = useSelector(selectImageLinks)
    
    const dispatch = useDispatch()
  
    return (
        <div>
            <MyArtPartial></MyArtPartial>
            <div className="vContainer">
                <label className="text subTitle">My Art Gallery</label>
                <div className="imgContainer">
                    {image_links.map((image) => {
                        return (
                            <div key={image.name} className="vContainer">
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