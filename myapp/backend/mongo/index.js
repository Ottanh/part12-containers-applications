const mongoose = require('mongoose')
const Person = require('./models/person')

if (process.env.MONGO_URL && !mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
console.log(process.env.MONGO_URL)

module.exports = {
  Person
}
