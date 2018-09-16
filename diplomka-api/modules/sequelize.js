const Sequelize = require('sequelize')

const sequelize = new Sequelize(F.isDebug ? CONFIG('db-debug-connection') : process.env.POSTGRESQL_URL, {
    // eslint-disable-next-line
    logging: DEBUG ? console.log : false,
    operatorsAliases: false,
    dialect: 'mysql',
    dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast(field, next) {
            if (field.type === 'DATETIME') {
                return new Date(field.string())
            }
            return next()
        }
    },
    timezone: '+02:00'
})

exports.install = () => {
    F.database = () => sequelize
}
