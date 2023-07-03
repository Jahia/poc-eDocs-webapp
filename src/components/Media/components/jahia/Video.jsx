import React from "react";
import PropTypes from "prop-types";
import {VideoPlayer} from "components/VideoPlayer";

export const Video = ({videoId, videoURL,ownerID}) => <VideoPlayer videoId={videoId} videoURL={videoURL} ownerID={ownerID}/>

Video.propTypes={
    videoId:PropTypes.string.isRequired,
    videoURL:PropTypes.string.isRequired,
    ownerID:PropTypes.string.isRequired,
}
