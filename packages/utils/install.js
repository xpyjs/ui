export const withInstall = (comp) => {
    const c = comp;
    c.install = function (app) {
        app.component(c.name, c);
    };
    return c;
};
