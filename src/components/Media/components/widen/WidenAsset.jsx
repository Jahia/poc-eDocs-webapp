import {WidenImage} from "components/Media/components/widen/WidenImage";
import {WidenVideo} from "components/Media/components/widen/WidenVideo";
import React from "react";
import {JahiaCtx} from "contexts";
import PropTypes from "prop-types";
import {useQuery} from "@apollo/client";
import {GetWidenMedia} from "webappGraphql";
import {useTranslation} from "react-i18next";

export const WidenAsset = ({types,id,width,sourceID}) => {
    // const width = '1024';
    const { t } = useTranslation();
    const { workspace, locale, cndTypes } = React.useContext(JahiaCtx);

    const {loading, error, data} = useQuery(GetWidenMedia, {
        variables:{
            workspace,
            language:locale,
            id
        },
        skip:!id
    });

    if (loading) return <p>{t("loading.bgImage")}</p>;//<img src={`https://via.placeholder.com/${width}x768/09f/fff?text=Loading`} alt="loading"/>;
    if (error) return <p>Error :(</p>;

    const mediaJcrProps = data.response.media;
    const {title} =mediaJcrProps
    const imageURL = mediaJcrProps.imageURL?.value;
    const videoURL = mediaJcrProps.videoURL?.value;

    switch (true){
        case types.includes(cndTypes.WIDEN_IMAGE) && !!imageURL :
            return <WidenImage imageURL={imageURL} title={title} width={width} />

        case types.includes(cndTypes.WIDEN_VIDEO) && !!videoURL :
            return <WidenVideo videoId={id} videoURL={videoURL} ownerID={sourceID} />

        default:
            return <></>;
    }
}

WidenAsset.propTypes={
    types:PropTypes.array.isRequired,
    id:PropTypes.string,
    width:PropTypes.string,
    sourceID:PropTypes.string
}
