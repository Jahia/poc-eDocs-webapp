import React from "react";

export const CloudinaryImage = ({baseUrl,endUrl,title}) => {
    const urlParams = "f_auto,w_1024"

    return (
        <img className="d-block w-100"
             src={`${baseUrl}/${urlParams}/${endUrl}`}
             alt={title}/>
    )
}
