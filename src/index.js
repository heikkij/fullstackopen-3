const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const PORT = 3001

let persons = [
    { id: 0, name: 'Arto Hellas', number: '040 123456' },
    { id: 1, name: 'Martti Tienari', number: '040 123456' },
    { id: 2, name: 'Arto Järvinen', number: '040 123456' },
    { id: 3, name: 'Lea Kutvonen', number: '040 123456' }
]

function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(10000000));
}

app.use(bodyParser.json())

app.get('/info', (req, res) => {
    res.send(`<p>puhelinluettelossa ${persons.length} henkilön tiedot</p><p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
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
    const person = {...request.body, id: getRandomInt()}
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