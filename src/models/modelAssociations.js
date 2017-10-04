module.exports = function applyAssociations (Models) {
  const { Person, SomethingElse } = Models
  Person.hasOne(SomethingElse, { as: 'something', foreignKey: 'ownerId' })

  return Models
}

