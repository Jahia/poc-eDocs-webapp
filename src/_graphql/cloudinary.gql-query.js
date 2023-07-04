import {gql} from "@apollo/client";
import {CORE_NODE_FIELDS} from "./fragments"

export const GetCloudyMedia = gql`
    ${CORE_NODE_FIELDS}
    query getCloudyMedia($workspace: Workspace!, $id: String!, $language: String!) {
        response: jcr(workspace: $workspace) {
            workspace
            media: nodeById(uuid: $id) {
                ...CoreNodeFields
                title:displayName(language:$language)
                url: property(name:"cloudy:url"){ value }
                baseUrl: property(name:"cloudy:baseUrl"){ value }
                endUrl: property(name:"cloudy:endUrl"){ value }
            }
        }
    }`


