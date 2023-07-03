import React from "react";
import PropTypes from "prop-types";
import {VideoPlayer} from "components/VideoPlayer";


export const WidenVideo = ({videoId, videoURL, ownerID}) => <VideoPlayer videoId={videoId} videoURL={videoURL} ownerID={ownerID} />

WidenVideo.propTypes={
    videoId:PropTypes.string.isRequired,
    videoURL:PropTypes.string.isRequired,
    ownerID:PropTypes.string.isRequired,
}
