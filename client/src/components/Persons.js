import Person from './Person'

const Persons = ({filterValue, filteredPersons, persons, deletePerson}) => {
    if (filterValue === "") {
        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th align="left">Name</th><th align="left">Number</th><th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {persons.map((person, key) =>
                        <Person key = {key} person = {person} deletePerson = {deletePerson}/>
                    )}
                    </tbody>
                </table>
            </>
        )
    }
    else {
        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th align="left">Name</th><th align="left">Number</th><th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredPersons.map(person => (
                        <Person key = {person.id} person = {person} deletePerson = {deletePerson}/>
                    ))}
                    </tbody>
                </table>
            </>
        )
    }
}

export default Persons