import React from "react";
import {JahiaCtx} from "contexts";
import PropTypes from "prop-types";
import {resolveJahiaMediaURL} from 'misc/utils';

export const Image = ({path,alt}) =>{
    const { host, workspace } = React.useContext(JahiaCtx);
    const src = resolveJahiaMediaURL({host,path,workspace})
    return(
        <img className=""
             // src={`${filesServerUrl}${encodeURI(path)}`}
             src={src}
             alt={alt}/>
    )
}

Image.propTypes={
    path:PropTypes.string.isRequired,
    alt:PropTypes.string,
}
