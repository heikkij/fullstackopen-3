const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
}
  
const url = process.env.MONGODB_URI

mongoose.connect(url).catch(error => {
    console.log(error)
})

const personSchema = mongoose.Schema({
    name: String,
    number: String,
})

personSchema.statics.format = (person) => {
    return {
        id: person._id,
        name: person.name,
        number: person.number,
    }
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person