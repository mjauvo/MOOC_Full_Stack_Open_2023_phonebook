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

const home = `<h1>Hello World!</h1><h3>This is Phonebook App (exercise 3.15)</h3>`

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
    Person.find({})
        .then(persons => {
            response.json(persons)
        })
})

// Add a person
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    // number is missing
    else if (body.number === undefined) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
        .save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch((error) => {
            console.log("Error adding a person:", error.message)
        })
})

// Delete a person
app.delete("/api/persons/:id", (request, response) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end();
        })
        .catch((error) => {
            console.log("Error deleting a person:", error.message)
        })
})

// ----------------------------------------

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})