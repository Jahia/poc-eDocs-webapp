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
        site{displayName}
    }`;

export const MEDIA_PROPERTY = gql`
    ${CORE_NODE_FIELDS}
    fragment MediaProperty on JCRNode {
        media: property(name:"doc4:image",){ node: refNode { ...CoreNodeFields } }
    }`;
