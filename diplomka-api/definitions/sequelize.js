const models = Object.keys(F.models);
(function initializeSequelizeModel(index) {
    const key = models[index];
    const nextIndex = index + 1;
    if (!key) {
        DATABASE().sync({
            // force: true
        }).then(() => {

        });
    } else if (typeof (MODEL(key).init) === 'function') {
        MODEL(key).init(() => {
            setImmediate(() => {
                initializeSequelizeModel(nextIndex);
            });
        });
    } else {
        setImmediate(() => {
            initializeSequelizeModel(nextIndex);
        });
    }
}(0));
