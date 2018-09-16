const Sequelize = require('sequelize')

const RealmStatus = DATABASE().define('realmStatus', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: true
    },
    realmName: Sequelize.STRING,
    startTime: Sequelize.DATE,
    endTime: Sequelize.DATE,
    onlineCount: Sequelize.INTEGER,
    lightFactionOnline: Sequelize.INTEGER,
    darkFactionOnline: Sequelize.INTEGER
})

exports.instance = RealmStatus

exports.init = function (callback) {
    return callback()
}
