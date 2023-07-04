import React from "react";
import {JahiaCtx} from "context";
import {Image} from "components/Media/components/jahia/Image";
import {Video} from "components/Media/components/jahia/Video";
import PropTypes from "prop-types";
import {resolveJahiaMediaURL} from 'misc/utils';

export const JahiaAsset = ({id,types,path,alt,sourceID, ...props}) => {
    const { cndTypes,host, workspace } = React.useContext(JahiaCtx);

    switch (true) {
        case Array.isArray(types) && types.length === 0 && path : //case external video
            return <Video videoId="external" url={path} ownerID={sourceID} {...props}/>

        case types.includes(cndTypes.JNT_FILE) && types.includes(cndTypes.IMAGE):
            return <Image path={path} alt={alt} {...props}/>

        case types.includes(cndTypes.JNT_FILE):
            return <Video videoId={id} videoURL={resolveJahiaMediaURL({host, path, workspace})} ownerID={sourceID} {...props}/>

        default:
            if (path)
                return <Image path={path} alt={alt} {...props}/>
    }
    return <></>
}

JahiaAsset.propTypes={
    types:PropTypes.array.isRequired,
    path:PropTypes.string,
    sourceID:PropTypes.string,
    alt:PropTypes.string
}
