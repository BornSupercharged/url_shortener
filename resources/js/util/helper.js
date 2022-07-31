export const page = (path, prefix) => {
    if (prefix) {
        prefix = `${prefix}/`;
    }
    return () =>
        import(
            /* webpackChunkName: '' */ `@/pages/${prefix ?? ""}${path}`
        ).then((m) => m.default || m);
};
