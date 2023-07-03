export const getImageURI = ({uri,host, workspace}) => {
    const filePath = `/files/${workspace === 'EDIT' ? 'default' : 'live'}`;
    if (!uri) {
        return '';
    }

    const index = uri.lastIndexOf('/');
    const filename = encodeURIComponent(uri.substring(index + 1));
    return `${host || process.env.REACT_APP_DEV_HOST}/${filePath}${uri.substring(0, index)}/${filename}`;
};

export const getTypes = jcrProps => {
    if(!jcrProps)
        return [];

    const superTypes = jcrProps.primaryNodeType.supertypes?.map(({name}) => name) || [];
    const mixinTypes = jcrProps.mixinTypes.map(({name}) => name) || [];
    const primaryNodeType = jcrProps.primaryNodeType?.name;
    return [primaryNodeType,...superTypes,...mixinTypes];
}
