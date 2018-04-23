const mongoose = require('mongoose')

const webuser = process.env.webuser
const webpassword = process.env.webpassword

const url = `mongodb://${webuser}:${webpassword}@ds253959.mlab.com:53959/fullstackopen`

console.log(url)

mongoose.connect(url)

const Identity = mongoose.model('Identity', {
    name: String,
    number: String,
})

const name = process.argv[2]
const number = process.argv[3]

if (name && number) {
    console.log(`lisätään henkilö ${name} numero ${number} luetteloon`)
    const identity = new Identity({
        name,
        number,
    })
    identity.save().then(response => {
        mongoose.connection.close()
    })
} else {
    console.log('puhelinluettelo:')
    Identity.find({}).then(identities => {
        identities.forEach(identity => console.log(`${identity.name} ${identity.number}`))
        mongoose.connection.close()
    })
}
