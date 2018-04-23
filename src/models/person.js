const mongoose = require('mongoose')

const webuser = process.env.webuser
const webpassword = process.env.webpassword

const url = `mongodb://${webuser}:${webpassword}@ds253959.mlab.com:53959/fullstackopen`

mongoose.connect(url)

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