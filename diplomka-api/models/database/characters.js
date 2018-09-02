const Sequelize = require('sequelize');

const Character = DATABASE().define('character', {
    name: Sequelize.TEXT,
    faction: Sequelize.INTEGER,
    type: Sequelize.INTEGER,
    mapId: Sequelize.INTEGER,
    positionX: Sequelize.INTEGER,
    positionY: Sequelize.INTEGER
});

exports.instance = Character;

exports.init = function (callback) {
    Character.belongsTo(MODEL('database/account').instance, {
        foreignKey: {
            name: 'accountId',
            allowNull: false
        },
        onDelete: 'NO ACTION'
    })

    return callback();
};
