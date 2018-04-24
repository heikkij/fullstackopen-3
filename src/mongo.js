const mongoose = require('mongoose')

const webuser = process.env.webuser
const webpassword = process.env.webpassword

const url = `mongodb://${webuser}:${webpassword}@ds253959.mlab.com:53959/fullstackopen`

console.log(url)

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String,
})

const name = process.argv[2]
const number = process.argv[3]

if (name && number) {
  console.log(`lisätään henkilö ${name} numero ${number} luetteloon`)
  const person = new Person({
    name,
    number,
  })
  person.save().then(
    mongoose.connection.close()
  )
} else {
  console.log('puhelinluettelo:')
  Person.find({}).then(people => {
    people.forEach(identity => console.log(`${identity.name} ${identity.number}`))
    mongoose.connection.close()
  })
}
