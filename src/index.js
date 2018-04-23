const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const PORT = 3001

let persons = [
    { id: 0, name: 'Arto Hellas', number: '040 123456' },
    { id: 1, name: 'Martti Tienari', number: '040 123456' },
    { id: 2, name: 'Arto Järvinen', number: '040 123456' },
    { id: 3, name: 'Lea Kutvonen', number: '040 123456' }
]

const getRandomInt = () => Math.floor(Math.random() * Math.floor(10000000))

morgan.token('body', (req) => JSON.stringify(req.body))
  
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))

app.get('/', (req, res) => {
    res.sendFile('build/index.html')
})

app.get('/info', (req, res) => {
    res.send(`<p>puhelinluettelossa ${persons.length} henkilön tiedot</p><p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(Person.format))
    })
})

app.get('/api/persons/:id', (request, response) => {
    const person = persons.find(person => person.id === Number(request.params.id))
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({error: 'content missing'})
    }
    const person = {...body, id: getRandomInt()}
    if (persons.find(p => p.name === person.name)) {
        return response.status(409).json({error: 'person already exists'})
    }
    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    persons = persons.filter(person => person.id !== Number(request.params.id))
    response.status(204).end()
})

app.listen(PORT, () => {
    console.log(`Persons backend running on port ${PORT}`)
})