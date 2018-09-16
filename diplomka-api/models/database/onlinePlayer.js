const Sequelize = require('sequelize')

const OnlinePlayer = DATABASE().define('onlinePlayer', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: true
    }
})

exports.instance = OnlinePlayer

exports.init = function (callback) {
    OnlinePlayer.belongsTo(MODEL('database/account').instance, {
        foreignKey: {
            name: 'accountId',
            allowNull: false
        },
        onDelete: 'NO ACTION'
    })
    OnlinePlayer.belongsTo(MODEL('database/characters').instance, {
        foreignKey: {
            name: 'characterId',
            allowNull: false
        },
        onDelete: 'NO ACTION'
    })
    return callback()
}
