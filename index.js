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

const home = `<h1>Hello World!</h1><h3>This is Phonebook App (exercise 3.12)</h3>`

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

//Fetch and show a person
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })

    console.log('GET request: /api/persons/', id)

    if (person) {
        console.log('200 SUCCESS')
        const person_info = `<p><strong>${person.name}</strong><br/>
        ${person.number}</p>`
        response.send(person_info)
    }
    else {
        console.log('400 NOT FOUND')
        const error_404 = `<p><strong>404</strong><br>"This is not the person you are looking for ..."</p>`
        response.status(404)
        response.send(error_404).end()
    }
})

// Delete a person
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    //console.log('DELETE request: /api/persons/', id)
    response.status(204).end()
})

const generateRandomId = () => {
    const max = 10000
    return Math.floor(Math.random() * max)
}

// Add a person
app.post('/api/persons', (request, response) => {
    const body = request.body
    //console.log('POST request')

    // name is missing -- 400 Bad Request
    if (body.name == undefined) {
        //console.log("404 Bad Request")
        return response.status(400).json({
            error: 'name missing'
        })
    }
    // number is missing -- 400 Bad Request
    if (body.name == undefined) {
        //console.log("404 Bad Request")
        return response.status(400).json({
            error: 'number missing'
        })
    }
    // name already exists -- 409 Conflict
    const foundPerson = persons.find((person) => person.name === body.name)

    if (foundPerson) {
        //console.log("409 Conflict")
        return response.status(409).json({
            error: 'name already exists'
        })
    }

    else {
        const person = {
            name: body.name,
            number: body.number,
            id: generateRandomId()
        }

        person
        .save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
    }
/*
    const person = {
        name: body.name,
        number: body.number,
        id: generateRandomId()
    }
*/
    //console.log('POST request: /api/persons/', person.id)
    persons = persons.concat(person)
    response.json(person)
})

// ----------------------------------------

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})