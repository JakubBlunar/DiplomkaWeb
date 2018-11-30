const Sequelize = require('sequelize')

const CharacterAttributes = DATABASE().define('character_attributes', {
    experience: Sequelize.FLOAT,
    money: Sequelize.FLOAT,
    stamina: Sequelize.FLOAT,
    agility: Sequelize.FLOAT,
    intelect: Sequelize.FLOAT,
    spirit: Sequelize.FLOAT,
    strength: Sequelize.FLOAT,
    armor: Sequelize.FLOAT
})

exports.instance = CharacterAttributes

exports.init = function (callback) {
    CharacterAttributes.belongsTo(MODEL('database/characters').instance, {
        foreignKey: {
            name: 'characterId',
            allowNull: false
        },
        onDelete: 'NO ACTION'
    })
    return callback()
}
