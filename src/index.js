const express = require('express')
const app = express()
const PORT = 3001

const persons = [
    { name: 'Arto Hellas', number: '040 123456' },
    { name: 'Martti Tienari', number: '040 123456' },
    { name: 'Arto Järvinen', number: '040 123456' },
    { name: 'Lea Kutvonen', number: '040 123456' }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.listen(PORT, () => {
    console.log(`Persons backend running on port ${PORT}`)
})