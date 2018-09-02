const moment = require('moment-timezone');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

U.prepareException = (exception) => {
    if (exception && exception instanceof ErrorBuilder && exception.hasError()) {
        const e = exception.transform('clear');
        e.prepare();
        return {
            errors: e.items
        };
    }
    return { errors: [] };
};

U.hashPassword = (password, salt, callback) => {
    crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, hash) => {
        if (err) {
            return callback(err);
        }
        return callback(null, hash.toString('hex'));
    });
};

U.generatePassword = (l) => {
    const length = l || 8;
    const charset = 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i += 1) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
};

U.hashEmail = (email) => {
    const hmac = crypto.createHmac('sha512', U.getSecret());
    hmac.update(email);
    return hmac.digest('hex');
};

U.encryptToken = (payload, expires) => {
    const config = {};
    if (expires) {
        config.expiresIn = expires;
    }
    return jwt.sign(payload, U.getSecret(), config).split('.').slice(1, 3).join('!');
};

U.decryptToken = (token) => {
    // eslint-disable-next-line
    const temp = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${token.replace(/\!/g, '.')}`;
    try {
        return jwt.verify(temp, U.getSecret());
    } catch (e) {
        return null;
    }
};

U.isTime = value => new RegExp(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).test(value);

U.parseDateFromTimestamp = (t) => {
    let timestamp = t;
    if (typeof (timestamp) === 'string' && timestamp.length === 10) {
        timestamp += '000';
    }
    const temp = parseFloat(timestamp);
    if (Number.isNaN(temp) || temp <= 0) {
        return null;
    }
    const date = new Date(temp);
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        return null;
    }
    return date;
};

U.log = () => {
    const log = U.variablesToString.apply(this, arguments);
    // eslint-disable-next-line
    console.log(log);
};

U.generateConfirmationToken = user =>
    U.encryptToken({
        uid: user.id,
        val: U.hashEmail(user.email),
        action: 'CONFIRM_EMAIL'
    }, 5184000);

U.toDebugStr = () => {
    let str = '';
    for (let i = 0; i < arguments.length; i += 1) {
        const arg = arguments[i];
        if (arg) {
            if (typeof (arg) === 'object' || Array.isArray(arg)) {
                if (Array.isArray(arg)) {
                    str += `Array(${arg.length}): \n`;
                } else if (typeof (arg) === 'object') {
                    str += 'Object: \n';
                }
                str += JSON.stringify(arg, null, '    ');
                str += '\n';
            } else {
                str += (i > 0 ? ' ' : '') + arg;
            }
        } else {
            str += (i > 0 ? ' ' : '') + arg;
        }
    }
    return str;
};

U.dateDiffInSec = (startDate, endDate) => {
    if (!startDate || !endDate) {
        return 0;
    }

    if (endDate < startDate) {
        return 0;
    }

    return (endDate.getTime() - startDate.getTime()) / 1000;
};