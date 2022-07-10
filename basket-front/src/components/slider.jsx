import React from 'react';
import {config} from '../config';
import SimpleImageSlider from "react-simple-image-slider";


const Slider = (props)=>{
    const images = [
    { url: config.pict_url + "slider/slider1.jpg"},
    { url: config.pict_url + "slider/slider2.jpg"},
    { url: config.pict_url + "slider/slider3.jpg"},
    { url: config.pict_url + "slider/slider4.jpg"},
    { url: config.pict_url + "slider/slider6.jpg"},
    { url: config.pict_url + "slider/slider5.jpg"},
];



  return (
 
    <div className="slider">
      <SimpleImageSlider
        width={950}
        height={620}
        images={images}
        showBullets={true}
        showNavs={true}
        autoPlay={true}
      />
    </div>
 
  );
} 

export default Slider; 