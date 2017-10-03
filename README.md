# Sequelizejs testing
One way to use [SequelizeJS](https://github.com/sequelize/sequelize). Integrate with your favorite nodejs http-server module.

## Quickstart
```
 $ npm install && npm start
```

## Example:

```javascript
const db = require('db') // Returns the db promise (ready after sync)
const Person = db.Models.Person

// Create two persons after db has synced
db.then(() => Person.create({ name: 'Max Smith', age: 12 }))
  .then(() => Person.create({ name: 'Luke Skywalker', age: 60 }))
```

