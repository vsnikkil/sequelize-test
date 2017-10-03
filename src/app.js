require('colors') // Require this first

const createDummyPerson = require('./utils').createDummyPerson
const Debug = require('debug')
const info = Debug('application')
const db = require('./db')
const { Person, SomethingElse } = db.Models

function printModel (m) {
  info(m.toJSON())
}

// Create one person to the database
let p = db.then(() => {
  info('creating one person to the database')
  Person.create(createDummyPerson())
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

