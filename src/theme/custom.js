import { createTheme } from '@mui/material';
import _merge from "lodash.merge";
import {defaultTheme} from "./default";

const parseUserTheme = (theme)=>{
    if(typeof theme === 'string'){
        try{
            return JSON.parse(theme);
        }catch(e){
            console.error("the user theme => \n"+theme+"\n => is not a json object : ",e);
        }
    };
    return theme;
}

export const mergedTheme = (userTheme) => createTheme( _merge({...defaultTheme},parseUserTheme(userTheme)));
