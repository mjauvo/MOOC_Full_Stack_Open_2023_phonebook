const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log("Connecting to ", url)

mongoose.connect(url)
    .then(result => {
        console.log("Connected to MongoDB")
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB:", error.message)
    })

    const personSchema = new mongoose.Schema({
        name: {
            required: [true, "Name is required!"],
            type: String,
            minlength: [5, 'Name must have at least 5 characters!'],
        },
        number: {
            required: [true, "Number is required!"],
            type: String,
            minlength: [8, 'Number must have at least 8 characters!'],
            validate: {
                validator: function(v) {
                    return /^\d{2,3}-\d+$/.test(v)
                },
                message: props => `${props.value} is not a valid number! Must have at least 8 characters and begin with 2 or 3 numbers!`
            }
        }
    })

    personSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject._v
        }
    })

module.exports = mongoose.model('Person', personSchema)