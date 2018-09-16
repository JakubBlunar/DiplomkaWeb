const Sequelize = require('sequelize')

const Account = DATABASE().define('account', {
    login: Sequelize.TEXT,
    name: Sequelize.TEXT,
    surname: Sequelize.TEXT,
    email: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    password: Sequelize.TEXT,
    confirmed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

exports.instance = Account

exports.init = function (callback) {
    Account.hasMany(MODEL('database/characters').instance, {
        foreignKey: {
            name: 'accountId',
            allowNull: false
        },
        onDelete: 'NO ACTION'
    })
    return callback()
}
