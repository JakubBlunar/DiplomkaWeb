const sha256 = require('sha256');

const Account = MODEL('database/account').instance


exports.install = () => {
    ROUTE('/api/account/registration', processRegistration, ['POST', '*AccountSignUp'])
}


const capitalizeFirstLetter = (string) => {
    if (!string || !string.length) {
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function makeError(key) {
    return new ErrorBuilder().setPrefix('errorRegistration-').push(key)
}

function processRegistration() {
    const self = this

    const model = self.body.$clean()
    model.login = model.login.toLowerCase()
    model.email = model.email.toLowerCase();
    model.name = capitalizeFirstLetter(model.name)
    model.surname = capitalizeFirstLetter(model.surname)

    if (model.password !== model.passwordRepeat) {
        return self.throw400(makeError('passwordsDoesNotMatch'))
    }

    return DATABASE().transaction(function (transaction) {
        return Promise.all([
            getAccount({
                email: model.email
            }, transaction),
            getAccount({
                login: model.login
            })
        ]).then(function (results) {
            if (results[0]) {
                throw new Error('emailExists')
            }

            if (results[1]) {
                throw new Error('loginExists');
            }

            const password = sha256(model.password).toUpperCase();
            model.password = password;
            delete model.passwordRepeat;
            model.confirmed = true;

            return makeAccout(model, transaction).then(function (account) {
                const expiration = new Date().add('30 minutes');
                const userAgent = self.req.headers['user-agent'].substring(0, 20).replace(/\s/g, '');
                const value = `${account.id}|${U.getSecret()}|${userAgent}|${self.ip}`
                self.cookie(CONFIG('cookie'), F.encrypt(value, U.getSecret()), expiration);
                return self.json({
                    account
                });
            })
        }).catch(function (err) {
            console.log(err)
            return self.throw400(makeError(err));
        })
    });
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


function makeAccout(data, transaction) {
    return Account.create(data, transaction)
}
