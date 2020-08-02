import React, { useState } from 'react'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

const BirthForm = ({ authors }) => {
  const [ name, setName ] = useState('')
  const [ date, setDate ] = useState('')
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: name.toString(), setBornTo: Number(date) } })
    setName('')
    setDate('')
  }

  const options = authors.map(a => {
    return { value: a.name, label: a.name}
  })

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Select 
            options={options}
            onChange={(target) => setName(target.value)}
            placeholder='select author'
            isSearchable
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthForm