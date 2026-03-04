import React from 'react';
import YouTube from "react-youtube";

const options = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 0,
    controls: 1,
  },
};
 function MovieClip ({videoId}) {
      const onReady = (event) => {
        return event.target.pauseVideo();
      }
  
      return(
        <div className="video-container">
          <YouTube 
            videoId={videoId} 
            options={options} 
            onReady={onReady} 
            id="video"
          />
        </div>
    )
          
  }

  export default MovieClip;