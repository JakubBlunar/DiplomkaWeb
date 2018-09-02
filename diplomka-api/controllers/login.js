const sha256 = require('sha256');

const Account = MODEL('database/account').instance

exports.install = () => {
    ROUTE('/api/account/login', processAccountLogin, ['POST', '*AccountLogin'])
}

function makeError(key) {
    return new ErrorBuilder().setPrefix('errorLogin').push(key)
}

function processAccountLogin() {
    const self = this

    const model = self.body.$clean()
    model.login = model.login.toLowerCase()

    return getAccount({
        login: model.login
    }).then(function (account) {
        if (!account) {
            throw new Error('notFound')
        }

        const password = sha256(model.password).toUpperCase();
        if (account.password !== password) {
            throw new Error('wrongPassword')
        }

        const expiration = model.remember ? new Date().add('1 month') : new Date().add('30 minutes');
        const userAgent = self.req.headers['user-agent'].substring(0, 20).replace(/\s/g, '');
        const value = `${account.id}|${U.getSecret()}|${userAgent}|${self.ip}`
        self.cookie(CONFIG('cookie'), F.encrypt(value, U.getSecret()), expiration);

        return self.json({
            account
        });
    }).catch(function (err) {
        console.log(err)
        return self.throw400(makeError(err));
    })
}

function getAccount(query, transaction) {
    const options = {
        where: {
            ...query
        }
    }

    if (transaction) {
        options.transaction = transaction
    }

    return Account.findOne(options);
}
