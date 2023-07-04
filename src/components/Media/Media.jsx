import React from 'react';
import PropTypes from "prop-types";
import {JahiaCtx} from "context";
import {WidenAsset} from "components/Media/components/widen";
import {JahiaAsset} from "components/Media/components/jahia";
import {CloudinaryAsset} from "components/Media/components/cloudinary";
import {getTypes} from "misc/utils";
export const Media = ({media,alt,sourceID,...props}) => {
    const { cndTypes } = React.useContext(JahiaCtx);
    if(!media)
        return null;

    const width="1024"; //Default background image size used by cloudy and widen
    const {uuid :id,path}=media;
    const types = getTypes(media);
    if(!alt)
        alt=media.name;

    switch(true){
        case types.includes(cndTypes.WIDEN) :
            return <WidenAsset types={types} id={id} width={width} sourceID={sourceID} {...props}/>

        case types.includes(cndTypes.CLOUDINARY) :
            return <CloudinaryAsset types={types} id={id} width={width} sourceID={sourceID} {...props}/>

        default :
            return <JahiaAsset id={id} types={types} path={path} sourceID={sourceID} alt={alt} {...props}/>
    }
}

Media.propTypes={
    id:PropTypes.string,
    types:PropTypes.array,
    path:PropTypes.string,
    sourceID:PropTypes.string,
    alt:PropTypes.string
}
