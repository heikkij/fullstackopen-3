const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const PORT = 3001

morgan.token('body', (req) => JSON.stringify(req.body))
  
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))

app.get('/', (request, response) => {
    response.sendFile('build/index.html')
})

app.get('/info', (request, response) => {
    Person.count({}).then(count => {
        response.send(`<p>puhelinluettelossa ${count} henkilön tiedot</p><p>${new Date()}</p>`)
    }).catch(error => {
        console.log(error)
        response.status(404).end()
    })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(Person.format))
    }).catch(error => {
        console.log(error)
        response.status(404).end()
    })
})

app.get('/api/persons/:id', (request, response) => {
    const body = request.body
    Person.findById(request.params.id).then(person => {
        response.json(Person.format(person))
    }).catch(error => {
        console.log(error)
        response.status(404).end()
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({error: 'content missing'})
    }
    Person.count({name: body.name}).then(count => {
        if (count) {
            return response.status(400).json({error: 'person already exists'})
        }
        const person = new Person(Person.format(body))
        person.save().then(saved => {
            response.json(Person.format(saved))
        }).catch(error => {
            console.log(error)
            response.status(404).end()
        })
    }).catch(error => {
        console.log(error)
        response.status(404).end()
    })
})

app.put('/api/persons/:id', (request, response) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number,
    }
    Person.findByIdAndUpdate(request.params.id, person, { new: true }).then(updated => {
        response.json(Person.format(updated))
    }).catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id).then(result => {
        response.status(204).end()
    }).catch(error => {
        response.status(400).send({ error: 'malformatted id' })
    })
})

app.listen(PORT, () => {
    console.log(`Persons backend running on port ${PORT}`)
})