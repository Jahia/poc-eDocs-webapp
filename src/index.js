import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import {JahiaCtxProvider} from './context';
import {ApolloProvider } from '@apollo/client';
import {getClient} from "./_graphql";
import reportWebVitals from './reportWebVitals';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
import './index.css';

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {appLanguageBundle} from "i18n/resources";

export const cndTypes = {
    // QUIZ:"game4nt:quiz",
    // QNA:"game4nt:qna",
    // WARMUP: "game4nt:warmup",
    WIDEN: "wdenmix:widenAsset",
    WIDEN_IMAGE: "wdennt:image",
    WIDEN_VIDEO: "wdennt:video",
    CLOUDINARY: "cloudymix:cloudyAsset",
    CLOUDINARY_IMAGE: "cloudynt:image",
    CLOUDINARY_VIDEO: "cloudynt:video",
    JNT_FILE: 'jnt:file',
    IMAGE: 'jmix:image',
    // SCORE_PERSO: "game4nt:scorePerso",
    // CONTENT_PERSO: ["game4nt:qnaPerso", "game4nt:warmupPerso"],
}

const render = (target,context) =>{

    Moment.globalMoment = moment;
    Moment.globalLocale = /*context.locale ||*/ 'fr';

    const locale = context.locale || 'en';
    i18n.use(initReactI18next) // passes i18n down to react-i18next
        .init({
            resources:appLanguageBundle,
            lng: locale,
            fallbackLng: "en",
            interpolation: {
                escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
            }
        });

    const root = ReactDOM.createRoot(document.getElementById(target));
    root.render(
        <React.StrictMode>
            <JahiaCtxProvider value={{
                workspace: context.workspace || process.env.REACT_APP_JCONTENT_WORKSPACE || 'LIVE',
                locale,
                documentId:context.documentId,
                host:context.host || process.env.REACT_APP_JCONTENT_HOST,
                cndTypes
            }}
            >
                {/*<Store context={context}>*/}
                    {/*<StyledEngineProvider injectFirst>*/}
                    <ApolloProvider client={getClient(context.gqlEndpoint)}>
                        {/*<CxsCtxProvider>*/}
                            <App />
                        {/*</CxsCtxProvider>*/}
                    </ApolloProvider>
                    {/*</StyledEngineProvider>*/}
                {/*</Store>*/}
            </JahiaCtxProvider>
        </React.StrictMode>
    )
};
window.pocDocumentReact = render;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
