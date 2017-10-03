const Debug = require('debug')
const info = Debug('db')

const dbOpts = {
  dialect: 'sqlite', storage: ':memory:', logging: false
}

const Sequelize = require('sequelize')
const sequelize = new Sequelize(null, null, null, dbOpts)
const modelDescriptions = require('./models/')

const Models = Object.keys(modelDescriptions)
  .map(modelName => {
    const MODEL_NAME_IDX = 0
    const modelDefinition = modelDescriptions[modelName]

    info(`defining model ${ modelDefinition[MODEL_NAME_IDX].bold }`)
    return {
      [modelName]: sequelize.define(...modelDefinition)
    }
  })
  .reduce((models, nextModel) => ({ ...models, ...nextModel }))

info('(force) syncing database')
let dbReadyForUse = sequelize.sync({ force: true })

module.exports = dbReadyForUse
module.exports.Models = Models

