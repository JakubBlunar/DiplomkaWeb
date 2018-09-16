const Character = MODEL('database/characters').instance
const OnlinePlayer = MODEL('database/onlinePlayer').instance

exports.install = () => {
    F.route('/api/online-players', getOnlinePlayers, ['GET'])
}

function makeError(key) {
    return new ErrorBuilder().setPrefix('errorOnlinePlayers-').push(key)
}


function getOnlinePlayers() {
    const self = this

    let {
        page,
        limit
    } = self.query

    page = U.parseInt(page, false)
    if (!page || page < 1) {
        page = 1
    }

    limit = U.parseInt(limit, false)
    if (!limit || limit < 1) {
        limit = 20
    }

    return getOnlinePlayersFromDb(page, limit).then((onlinePlayers) => {
        const {
            rows,
            count
        } = onlinePlayers

        return self.json({
            onlinePlayers: rows.map(U.formatOnlinePlayerForResponse),
            count,
            page,
            pages: Math.ceil(count / limit),
            limit
        })
    }).catch((err) => {
        switch (err.message) {
            default:
                return self.throw500(makeError('unableToGet'))
        }
    })
}

function getOnlinePlayersFromDb(page, limit) {
    const offset = (page - 1) * limit

    const options = {
        where: {},
        offset,
        limit,
        include: [{
            model: Character
        }]
    }

    return OnlinePlayer.findAndCount(options)
}
