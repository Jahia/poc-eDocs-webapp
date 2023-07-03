import {VideoPlayer} from "components/VideoPlayer";
import React from "react";
import PropTypes from "prop-types";

export const CloudinaryVideo = ({videoId, videoURL, ownerID}) => <VideoPlayer videoId={videoId} videoURL={videoURL} ownerID={ownerID} />

CloudinaryVideo.propTypes={
    videoId:PropTypes.string.isRequired,
    videoURL:PropTypes.string.isRequired,
    ownerID:PropTypes.string.isRequired,
}
