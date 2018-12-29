const Sequelize = require('sequelize')

const Character = DATABASE().define('character', {
    name: Sequelize.TEXT,
    faction: Sequelize.INTEGER,
    type: Sequelize.INTEGER,
    mapId: Sequelize.INTEGER,
    positionX: Sequelize.INTEGER,
    positionY: Sequelize.INTEGER
})

exports.instance = Character

exports.init = function (callback) {
    Character.belongsTo(MODEL('database/account').instance, {
        foreignKey: {
            name: 'accountId',
            allowNull: false
        },
        onDelete: 'NO ACTION'
    })

    Character.hasOne(MODEL('database/characterAttributes').instance, {
        foreignKey: {
            name: 'characterId',
            allowNull: false
        },
        onDelete: 'CASCADE'
    })

    Character.hasMany(MODEL('database/characterSpells').instance, {
        foreignKey: {
            name: 'characterId',
            allowNull: false
        },
        onDelete: 'CASCADE'
    })
    return callback()
}
