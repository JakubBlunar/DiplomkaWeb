exports.install = () => {
    F.route('#400', handleError);
    F.route('#401', handleError);
    F.route('#403', handleError);
    F.route('#404', handleError);
    F.route('#500', handleError);

    ErrorBuilder.addTransform('clear', function clear() {
        if (this.items && Array.isArray(this.items)) {
            for (let i = 0; i < this.items.length; i += 1) {
                delete this.items[i].path;
            }
        }
        return this;
    }, true);
};

function handleError() {
    const self = this;

    self.status = parseFloat(self.route.name.substring(1, 4));

    const isAcceptTypeJson = self.req && self.req.headers && self.req.headers.accept && self.req.headers.accept.indexOf('application/json') >= 0;

    switch (self.status) {
        case 400:
        case 500:
            if (isAcceptTypeJson) {
                return self.json(U.prepareException(self.exception));
            }
            self.layout('~/web/layout');
            return self.view('error', U.prepareException(self.exception));
        case 401:
            if (isAcceptTypeJson) {
                return self.json(U.prepareException(self.exception));
            }
            if (self.req.isAuthorized) {
                return self.redirect('/');
            }
            return self.redirect(F.sitemap('account-sign-in', true).url);
        case 403:
        case 404:
            if (isAcceptTypeJson) {
                return self.json(U.prepareException(self.exception));
            }
            return self.redirect('/');
        case 409:
            self.status = 409;
            if (isAcceptTypeJson) {
                return self.json(U.prepareException(self.exception));
            }
            self.layout('~/web/layout');
            return self.view('error', U.prepareException(self.exception));
        default:
            if (isAcceptTypeJson) {
                return self.json();
            }
            self.layout('~/web/layout');
            return self.view('error', U.prepareException(self.exception));
    }
}

Controller.prototype.throw409 = function func409(p) {
    const self = this;

    let problem = (typeof (p) === 'object') ? p : {};
    self.status = 409;

    if (problem instanceof ErrorBuilder) {
        problem = U.prepareException(problem);
    }

    return self.json(problem);
};
