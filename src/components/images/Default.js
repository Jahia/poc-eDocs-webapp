import React from 'react';
import {JahiaCtx} from "../../context";
import {getImageURI} from '../../utils';

export const DefaultImage = ({path, alt = '', className = '', width, height,...props}) => {
    const {workspace,host} = React.useContext(JahiaCtx);

    return (
        <img src={getImageURI({uri: path,host, workspace})}
             alt={alt}
             className={className}
             width={width}
             height={height}
             {...props}
        />
    );
};
