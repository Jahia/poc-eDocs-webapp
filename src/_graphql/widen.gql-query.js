import {gql} from "@apollo/client";
import {CORE_NODE_FIELDS} from "./fragments"

export const GetWidenMedia = gql`
    ${CORE_NODE_FIELDS}
    query getWidenMedia($workspace: Workspace!, $id: String!, $language: String!) {
        response: jcr(workspace: $workspace) {
            workspace
            media: nodeById(uuid: $id) {
                ...CoreNodeFields
                title:displayName(language:$language)
                imageURL: property(name:"wden:templatedUrl"){ value }
                videoURL: property(name:"wden:videoStreamURL"){ value }
            }
        }
    }`


