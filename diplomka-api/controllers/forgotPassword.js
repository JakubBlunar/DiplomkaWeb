const sha256 = require('sha256')

const Account = MODEL('database/account').instance

exports.install = () => {
    F.route('/api/reset-password', resetPassword, ['post', '*ResetPassword'])
    F.route('/api/password-recovery', sendRecoveryToken, ['post', '*ForgotPassword'])
}

function resetPassword() {
    const self = this

    const token = U.decryptToken(self.body.token || '')

    if (self.body.newPassword !== self.body.repPassword) {
        return self.throw400(new ErrorBuilder().setPrefix('forgotPassword-').push('passwordsDoesNotMatch'))
    }

    return DATABASE().transaction((transaction) => {
        if (!token || !token.aid || !token.val || token.action !== 'RESET_PASSWORD') {
            throw new Error('invalidToken')
        }
        return Account.findById(token.aid, {
            transaction
        }).then((account) => {
            if (!account) {
                throw new Error('notFound')
            }

            const hash = U.hashEmail(account.email)
            if (token.val !== hash) {
                throw new Error('invalidToken')
            }

            const password = sha256(self.body.newPassword).toUpperCase()
            return Promise.resolve([account, {
                password
            }])
        }).then(result => result[0].updateAttributes(result[1], {
            transaction
        }))
    }).then(() => self.json(SUCCESS(true))).catch((err) => {
        console.log(err)
        switch (err.message) {
            case 'invalidToken':
                return self.throw400(new ErrorBuilder().setPrefix('forgotPassword-').push('invalidToken'))
            case 'notFound':
                return self.throw404(new ErrorBuilder().setPrefix('forgotPassword-').push('notFound'))
            default:
                return self.throw500(new ErrorBuilder().setPrefix('forgotPassword-').push('unableToReset'))
        }
    })
}

function sendRecoveryToken() {
    const self = this
    const error = 'forgotPassword-'

    const options = {
        where: {
            email: self.body.email
        }
    }
    return Account.findOne(options).then((account) => {
        if (!account) {
            throw new Error('notFound')
        }
        return sendForgotPasswordEmail(self, account)
    }).then(() => self.json(SUCCESS(true))).catch((err) => {
        switch (err.message) {
            case 'notFound':
                return self.throw409(new ErrorBuilder().setPrefix(error).push('notFound'))
            default:
                return self.throw500(new ErrorBuilder().setPrefix(error).push('unableToSendToken'))
        }
    })
}

function sendForgotPasswordEmail(controller, account) {
    return new Promise(function (resolve, reject) {
        const email = new Mail.Message(`${CONFIG('name')} – Forgot password`, F.view('email', {
            subject: `${CONFIG('name')} – Forgot password`,
            rows: [
                'Hello,',
                `You have applied for reset password in ${CONFIG('name')}.`,
                'You can reset your password here: '
            ],
            link: {
                text: 'Reset password',
                url: `${CONFIG('base-url')}/reset-password?token=${U.generateResetPasswordToken(account)}`
            },
            footer: `This email was attended for ${account.email}`
        }));

        email.from(CONFIG('mail-address-from'), CONFIG('name'));
        email.to(account.email);

        const smtpOptions = {
            ...CONFIG('mail-smtp-options'),
            user: process.env.SMTP_USER,
            password: process.env.SMTP_PASSWORD
        }

        email.send(CONFIG('mail-smtp'), smtpOptions, function (err) {
            if (err) {
                return reject(err);
            }
            return resolve(account);
        });
    });
}
