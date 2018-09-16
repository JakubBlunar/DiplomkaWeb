const Account = MODEL('database/account').instance

F.onAuthorize = (req, res, flags, callback) => {
    const cookie = req.cookie(F.config.cookie)
    if (cookie === null || cookie.length < 10) {
        return callback(false)
    }
    const obj = F.decrypt(cookie, U.getSecret(), false)
    if (obj === null || obj === '') {
        return callback(false)
    }
    const values = obj.split('|')
    if (values[1] !== U.getSecret() || values[3] !== req.ip || values[2] !== req.headers['user-agent'].substring(0, 20).replace(/\s/g, '')) {
        return callback(false)
    }
    const id = values[0]
    if (!id) {
        return callback(false)
    }

    return Account.findOne({
        where: {
            id
        }
    }).then((resUser) => {
        const user = resUser
        if (!user) {
            return callback(false)
        }
        delete user.password
        return callback(true, user)
    })
}
