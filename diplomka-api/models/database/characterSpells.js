const Sequelize = require('sequelize')

const CharacterSpells = DATABASE().define('character_spells', {
    spellType: Sequelize.INTEGER
})

exports.instance = CharacterSpells

exports.init = function (callback) {
    CharacterSpells.belongsTo(MODEL('database/characters').instance, {
        foreignKey: {
            name: 'characterId',
            allowNull: false
        },
        onDelete: 'NO ACTION'
    })
    return callback()
}
