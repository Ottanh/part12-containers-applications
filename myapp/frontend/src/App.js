
import React, { useState, useEffect } from 'react'
import Persons from './components/persons'
import PersonForm from './components/personform'
import Filter from './components/filter'
import Services from './services/services'

const Notification = ({ message, id }) => {
  if (message === null) {
    return null
  }

  return (
    <div id={id}>
      {message}
    </div>
  )
}


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')
  const [ message, setMessage] = useState(null)
  const [ error, setError ] = useState(null)

  useEffect(() => {
    Services
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name : newName,
      number : newNumber
    }

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson !== undefined){
      if(window.confirm(`${newName} is already added to phonebook,
       replace the old number with a new one?`)){
         Services
          .update(existingPerson.id, personObj)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          })
          .then(() => {
            setMessage(
              `Changed ${existingPerson.name}'s number`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setError(`Information of ${existingPerson.name} has laready been removed from the server`)
            setTimeout(() => {
              setError(null)
            }, 5000)
          })
       }
      return
    }

    Services
      .create(personObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
      })
      .then(() => {
        setMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error.response.data)
        
        setMessage(error.response.data.error)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        
      })
      
      console.log(persons)
      
      
  }

  const deletePerson = (id) => {

    const person = persons.find(person => person.id === id); 

    if(window.confirm(`Delete ${person.name}`)){
      Services
        .deletePerson(id)
        .then(() => {
          Services.getAll().then(
            initialPersons => {
              setPersons(initialPersons)
            })
        })
        .then(() => {
          setMessage(
            `Deleted ${person.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }



  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification id={'msg'} message={message} />
      <Notification id={'err'} message={error} />
      <Filter filter={filter}
      handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm addPerson={addPerson}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange} 
      newName={newName}
      newNumber={newNumber}/>

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onclick={deletePerson}/>
    </div>
  )

}

export default App
