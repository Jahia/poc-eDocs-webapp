import {gql} from "@apollo/client";
import {CORE_NODE_FIELDS,MEDIA_PROPERTY} from "./fragments"

export const queryDocument = gql`
    ${CORE_NODE_FIELDS}
    ${MEDIA_PROPERTY}
    query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid:$id) {
                ...CoreNodeFields
                title:displayName(language:$language)
                subtitle: property(name:"doc4:subtitle"){ value }
                model: property(name:"doc4:model"){ value }
                revision: property(name:"doc4:revision"){ value }
                company: property(name:"doc4:company"){ refNode {
                    ...CoreNodeFields
                    logo: property(name:"doc4:logo"){ refNode { ...CoreNodeFields } }
                    owner: property(name:"doc4:owner"){ value }
                    adresse: property(name:"doc4:adresse"){ value }
                    zipcode: property(name:"doc4:zipcode"){ value }
                    city: property(name:"doc4:city"){ value }
                    mobile: property(name:"doc4:mobile"){ value }
                    email: property(name:"doc4:email"){ value }
                    ...MediaProperty
                } }
                fragments : property(name:"doc4:fragments",){ refNodes {
                        ...CoreNodeFields
                        title:displayName(language:$language)
                        content:renderedContent(view:"hidden.gqlRendering"){value:output}
                        ...MediaProperty
                    }
                }
                config : property(name:"doc4:webAppConfig",){ refNode {
                        ...CoreNodeFields
                        userTheme: property(name:"doc4:webappTheme"){ value }
                    }
                }
                ...MediaProperty
            }
        }
    }`;
