import React from 'react';
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

export const VideoPlayer = (props)=>{
    const {videoURL} = props;

    return (
        <div>
            <ReactPlayer
                className='react-player'
                url={videoURL}
                controls
                width='100%'
            />
        </div>
    )
}

VideoPlayer.propTypes={
    videoURL:PropTypes.string.isRequired
}
