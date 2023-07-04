import {VideoPlayer} from "components/VideoPlayer";
import React from "react";
import PropTypes from "prop-types";

export const CloudinaryVideo = ({videoId, videoURL, ownerID, ...props}) => <VideoPlayer videoId={videoId} videoURL={videoURL} ownerID={ownerID} {...props}/>

CloudinaryVideo.propTypes={
    videoId:PropTypes.string.isRequired,
    videoURL:PropTypes.string.isRequired,
    ownerID:PropTypes.string.isRequired,
}
