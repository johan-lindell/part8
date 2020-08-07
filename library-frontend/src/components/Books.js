import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import Select from 'react-select'

const Books = (props) => {
  const [ filter, setFilter] = useState(null)
  const booksResult = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }
  //if server has not yet got a response
  if (booksResult.loading) {
    return <div>loading...</div>
  }


  //defines array of books
  const books = booksResult.data.allBooks
  //defines array of all the genres
  const genres = books
    .map(b => b.genres)
    .flat(1)
    .filter((v, i, a) => a.indexOf(v) === i)
  //defines options for react-select component
  const options = genres.map(g => {
    return { value: g, label: g }
  }).concat({ value: null, label: 'all genres' })

  //defines books to show based on filter value
  let booksToShow
  if (filter) {
    booksToShow = books.filter(b => b.genres.includes(filter))
  } else {
    booksToShow = books
  }
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <Select 
        options={options}
        isSearchable
        onChange={(o) => setFilter(o.value)}
      />
    </div>
  )
}

export default Books