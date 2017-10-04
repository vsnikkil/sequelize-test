// Just generates dummy person
module.exports.createDummyPerson = function createDummyPerson (amount = 1) {
  const firstNames = ['Donald', 'Max', 'Jon', 'Jane', 'Will', 'Jonathan', 'Chocolate', 'Igor']
  const lastNames = ['Smith', 'Bar', 'Foo', 'Doe', 'Trump', 'Rain', 'Washington']
  const randomFromArray = arr => {
    return arr[parseInt(Math.random() * arr.length)]
  }

  const generateDummyPerson = () => ({
    name: `${ randomFromArray(firstNames) } ${ randomFromArray(lastNames) }`,
    age: parseInt(Math.random() * 100)
  })

  if (amount === 1) return generateDummyPerson()
  else if (amount > 1) {
    return [...new Array(amount)].map(generateDummyPerson)
  }

 return null
}

