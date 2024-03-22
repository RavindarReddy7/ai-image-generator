import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image from '../Assets/AI_Image.jpeg'

const ImageGenerator = () => {


    const[image_url, setImage_url] = useState("/");

    let inputRef = useRef(null);

    const [loading, setLoading] = useState(false);


    const imagegenerator = async () => {

        if(inputRef.current.value === ""){
            return 0;
        }

        setLoading(true);

        const response = await fetch ("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json",
                Authorization:
                "Bearer W7h7IoMBvtjwX7Sfj7D9a3pklB",
                "User-Agent" : "chrome",
            },
            body:JSON.stringify({

                prompt:`${inputRef.current.value}`,
                n:1,
                size: "512 * 512",
            }),

        });

        let data = await response.json();

        let data_array = data.data;
         setImage_url(data_array[0].url);
         setLoading(false);

    }

  return (
    <div className='ai-image-generator'>
        <div className='header'>AI Image <span>Generator</span></div>
        <div className="img-loading">
          <div className="image"><img src={ image_url === "/"? default_image:image_url} alt="" /></div>  

          <div className="loading">
            
            <div className={loading ? "loading-bar-full": "loading-bar"}></div>
            <div className= {loading ? "loading-text" : "display-none "}>generating image...</div>
            </div> 
          </div>

          <div className="search-box">

            <input type="text" ref = {inputRef} className='search-input' placeholder=' Describe what you wanna see' />

            <div className="generate-btn" oncClick = {()=>{imagegenerator()}}>Generate</div>
          </div>
    </div>
  )
}

export default ImageGenerator
