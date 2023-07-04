import React from "react";
import {JahiaCtx} from "context";
import PropTypes from "prop-types";
import {resolveJahiaMediaURL} from 'misc/utils';

export const Image = ({path,alt,...props}) =>{
    const { host, workspace } = React.useContext(JahiaCtx);
    const src = resolveJahiaMediaURL({host,path,workspace})
    return(
        <img className=""
             // src={`${filesServerUrl}${encodeURI(path)}`}
             src={src}
             alt={alt}
             {...props}/>
    )
}

Image.propTypes={
    path:PropTypes.string.isRequired,
    alt:PropTypes.string,
}
