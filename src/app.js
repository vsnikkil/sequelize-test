require('colors') // Require this first

const createDummyPerson = require('./utils').createDummyPerson
const Debug = require('debug')
const info = Debug('application')
const db = require('./db')
const { Person, SomethingElse } = db.Models

function printModel (m) {
  info(m.toJSON())
}

// Create one person and one of 'something else' to the database
// Note: using async - await syntax
let p = db.then(async () => {
  info('creating one person and one of \'something else\' to the database')
  const something = await SomethingElse.create({ foo: 'fancy', bar: 'computer' })
  const person = await Person.create(createDummyPerson())
  
  await person.setSomething(something)
  const whatPersonHas = await person.getSomething()
  info(`now person ${ person.name.bold } has a ${ whatPersonHas.foo } ${ whatPersonHas.bar }`)
})

// Bulk create demonstration
p = p.then(() => {
  const AMOUNT_OF_PEOPLE = 5
  info('bulk creating many persons to the database')
  Person.bulkCreate(createDummyPerson(AMOUNT_OF_PEOPLE))
})

// Create one of SomethingElse
p = p.then(() => {
  info('creating somethingElse')
  SomethingElse.create({ foo: 'hello', bar: 'world' })
})

// Print persons from the db
p = p.then(() => new Promise(resolve => {
  info('database contains following people:'.bold)
  Person.findAll()
    .then(persons => persons.forEach(printModel))
    .then(resolve) // Resolve the main promise
  })
)

// Print somethingElses from the db
p = p.then(() => new Promise(resolve => {
    info('database contains following somethingElses:'.bold)
    SomethingElse.findAll()
      .then(somethingElse => somethingElse.forEach(printModel))
      .then(resolve) // Resolve the main promise
  })
)

