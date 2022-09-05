import React from 'react'

const Persons = ({persons,filter, onclick}) => {
  console.log(persons)

  return (
  persons
  .filter( person => person.name.includes(filter))
  .map(person =>
    <div key={person.id}>
      <p>
        {person.name} {person.number} {" "}
        <button onClick={() => onclick(person.id)}>Delete</button>
      </p>
    </div>)
  )
}

export default Persons