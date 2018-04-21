const express = require('express')
const app = express()
const PORT = 3001

let persons = [
    { id: 0, name: 'Arto Hellas', number: '040 123456' },
    { id: 1, name: 'Martti Tienari', number: '040 123456' },
    { id: 2, name: 'Arto Järvinen', number: '040 123456' },
    { id: 3, name: 'Lea Kutvonen', number: '040 123456' }
]

app.get('/info', (req, res) => {
    const current = new Date()
    res.send(`<p>puhelinluettelossa ${persons.length} henkilön tiedot</p><p>${current}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.listen(PORT, () => {
    console.log(`Persons backend running on port ${PORT}`)
})