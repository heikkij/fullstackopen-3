const mongoose = require('mongoose')

const webuser = process.env.webuser
const webpassword = process.env.webpassword

const url = `mongodb://${webuser}:${webpassword}@ds253959.mlab.com:53959/fullstackopen`

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String,
})

module.exports = Person