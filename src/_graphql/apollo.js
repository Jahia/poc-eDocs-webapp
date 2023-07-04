import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

const httpLink = (endpoint) => createHttpLink({
    uri: endpoint || process.env.REACT_APP_JCONTENT_GQL_ENDPOINT
});

const authLink = setContext((_, {headers}) => {
    const token = process.env.REACT_APP_GQL_API_TOKEN;
    const props = {};

    if (token) {
        props.Authorization = `APIToken ${token}`;
    }
    return {
        headers: {
            ...headers,
            ...props,
            // origin: process.env.NEXT_PUBLIC_JAHIA_BASE_URL
        }
    };
});

// export const getClient = (gqlEndpoint) => new ApolloClient({
//     link: authLink.concat(httpLink(gqlEndpoint)),
//     cache: new InMemoryCache(),
// });

const possibleTypes = {
    JCRNode: ['JCRNode', 'GenericJCRNode', 'JCRSite', 'VanityUrl'],
    JCRItemDefinition: ['JCRItemDefinition', 'JCRPropertyDefinition', 'JCRNodeDefinition']
};

const mainType = {};
Object.keys(possibleTypes).forEach(k => {
    possibleTypes[k].forEach(v => {
        mainType[v] = k;
    });
});

const customTypePolicies = {
    JCRNode: {
        keyFields: ['uuid', 'workspace']
    },
    JCRQuery: {
        keyFields: ['workspace']
    },
    JCRNodeType: {
        keyFields: ['name']
    },
    GqlEditorForms: {
        keyFields: []
    }

};

function getNodeKey(uuid, workspace) {
    return 'JCRNode:' + JSON.stringify({uuid, workspace});
}

export const getClient = (gqlEndpoint) => {
    console.log('Creating apollo client');

    // Map of path/uuid to be able to resolve cache key when we only have the path during cache resolving
    const idByPath = {};

    let currentWs;

    const typePolicies = {
        ROOT_QUERY: {
            queryType: true,
            fields: {
                jcr: (existingData, {args, toReference}) => {
                    // Field function is only here to set the current workspace
                    currentWs = ((args && args.workspace) || 'EDIT');
                    return existingData || toReference({__typename: 'JCRQuery', workspace: currentWs});
                }
            }
        },
        GqlPublicationInfo: {
            merge: true
        },
        JCRQuery: {
            fields: {
                nodeById: (existingData, {args, toReference}) =>
                    existingData || toReference(getNodeKey(args.uuid, currentWs)),
                nodesById: (existingData, {args, toReference}) =>
                    existingData || args.uuids.map((uuid) => toReference(getNodeKey(uuid, currentWs))),
                nodeByPath: (existingData, {args, toReference}) =>
                    existingData || (idByPath[args.path] && toReference(getNodeKey(idByPath[args.path], currentWs))),
                nodesByPath: (existingData, {args, toReference}) =>
                    existingData || (args.paths.every((path) => idByPath[path]) && args.paths.map((path) => toReference(getNodeKey(idByPath[path], currentWs))))
            }
        }
    };

    const dataIdFromObject = (data, context) => {
        // In order to cache JCR node we need at least uuid and workspace fields
        const type = mainType[data.__typename] ? mainType[data.__typename] : data.__typename;
        if (type === 'JCRNode' && data.path && data.uuid) {
            // Store key for path, in case queryNodeByPath is used in the future we can resolve the appropriate ID
            idByPath[data.path] = data.uuid;
        }

        if (customTypePolicies[type]) {
            const keyFields = customTypePolicies[type].keyFields;
            if (keyFields.every(keyField => data[keyField])) {
                return type + ':' + JSON.stringify(keyFields.reduce((v, keyField) => ({
                    ...v,
                    [keyField]: data[keyField]
            }), {}));
            }

            console.error('Missing fields ' + keyFields + ' while extracting key from ' + data.__typename + ', data:', data, 'context:', context);
        }

        return undefined;
    };

    const config = {
        dataIdFromObject,
        possibleTypes,
        typePolicies
    };


    return new ApolloClient({
        link: authLink.concat(httpLink(gqlEndpoint)),
        cache: new InMemoryCache(config)
    });
}
