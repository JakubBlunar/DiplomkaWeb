const moment = require('moment-timezone');

moment.tz.setDefault('Bra');

const RealmStatus = MODEL('database/realmStatus').instance

exports.install = () => {
    F.route('/api/realm-status', getRealmStatus, ['GET'])
}

function makeError(key) {
    return new ErrorBuilder().setPrefix('errorRealmStatus-').push(key)
}


function getRealmStatus() {
    const self = this

    return getRealmStatusFromDb().then((realmStatus) => {
        if (!realmStatus) {
            return self.throw400(makeError('notFound'))
        }

        const model = {
            realmName: realmStatus.realmName,
            startTime: realmStatus.startTime,
            endTime: realmStatus.endTime,
            onlineCount: realmStatus.onlineCount,
            lightFactionOnline: realmStatus.lightFactionOnline,
            darkFactionOnline: realmStatus.darkFactionOnline,
            updatedAt: realmStatus.updatedAt
        }

        const {
            updatedAt,
            startTime,
            endTime
        } = model

        let status = 'online'
        if (startTime >= endTime) {
            status = 'online'

            let duration = moment.duration(moment().diff(moment(updatedAt)))
            duration = duration.asMinutes()

            if (duration >= 2) {
                status = 'unknown'
            }
        } else {
            status = 'offline'
        }
        model.status = status
        return self.json(model)
    }).catch((err) => {
        console.log(err)
        switch (err.message) {
            default:
                return self.throw500(makeError('unableToGet'))
        }
    })
}

function getRealmStatusFromDb() {
    const options = {
        where: {
            id: 1
        }
    }
    return RealmStatus.findOne(options)
}
