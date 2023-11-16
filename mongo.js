const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give password as argument!')
  process.exit(1)
}
else {
    const password = process.argv[2]
    const url = `mongodb+srv://fullstack22MJA:${password}@cluster0.aii3azc.mongodb.net/phonebookApp?retryWrites=true&w=majority`

    mongoose.set('strictQuery', false)
    mongoose.connect(url)

    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    })

    const Person = mongoose.model('Person', personSchema)

    if (process.argv.length > 3) {
        const personName = process.argv[3]
        const personNumber = process.argv[4]
    
        const person = new Person({
            name: personName,
            number: personNumber
        })
    
        person.save()
        .then(result => {
            console.log("added", personName, "number", personNumber, "to phonebook")
            mongoose.connection.close()
        })
    }
    else {
        Person
        .find({})
        .then(result => {
            console.log("\nphonebook:")
            result.forEach(person => {
                console.log(person.name, person.number)
            })
            console.log()
            mongoose.connection.close()
        })
    }
}