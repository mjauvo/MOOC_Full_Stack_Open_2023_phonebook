require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const Person = require('./models/person')

app.use(express.json())
//app.use(morgan('tiny'))

morgan.token('data', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status  :res[content-length] - :response-time ms :data'))

app.use(cors())
app.use(express.static('build'))

const home = `<h1>Hello World!</h1><h3>This is Phonebook App (exercise 3.14)</h3>`

// Show homepage
app.get('/', (request, response) => {
    //console.log('GET request: /')
    response.send(home)
})

// Show info page
app.get('/info', (request, response) => {
    console.log('GET request: /info')
    Person.find({}).then(persons => {
        response.send(`
        <p>Phonebook has info for ${persons.length} people.</p>
        <p>${new Date()}</p>
        `)
    })
})

// Fetch and show all persons
app.get('/api/persons', (request, response) => {
    console.log('GET request: /api/persons')
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

// ----------------------------------------

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})