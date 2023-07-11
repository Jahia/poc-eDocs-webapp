import {gql} from '@apollo/client';

export const CORE_NODE_FIELDS = gql`
    fragment CoreNodeFields on JCRNode {
        workspace
        uuid
        path
        name
        primaryNodeType {
            name
            supertypes{name}
        }
        mixinTypes {name}
        site{
            workspace
            uuid
            displayName
        }
    }`;

export const MEDIA_PROPERTY = gql`
    ${CORE_NODE_FIELDS}
    fragment MediaProperty on JCRNode {
        media: property(name:"doc4:image",){ refNode { ...CoreNodeFields } }
    }`;

export const WEBAPP_CONFIG = gql`
    fragment WebappConfig on JCRNode {
        userTheme: property(name:"doc4:webappTheme"){ value }
        userCss: property(name:"doc4:webappCustomCss"){ value }
        LabelOwner: property(language:$language, name:"doc4:owner"){ value }
        LabelAddress: property(language:$language, name:"doc4:address"){ value }
        LabelPhone: property(language:$language, name:"doc4:phone"){ value }
        LabelEmail: property(language:$language, name:"doc4:email"){ value }
    }`;