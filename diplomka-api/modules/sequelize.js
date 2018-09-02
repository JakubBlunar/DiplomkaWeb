const Sequelize = require('sequelize');

const sequelize = new Sequelize(F.isDebug ? CONFIG('db-debug-connection') : process.env.POSTGRESQL_URL, {
    // eslint-disable-next-line
    logging: DEBUG ? console.log : false,
    operatorsAliases: false,
    dialect: 'mysql'
});

exports.install = () => {
    F.database = () => sequelize;
};
