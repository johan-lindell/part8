import React from 'react'
import { LOGGED_USER, ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Recommend = ({ show }) => {
  const { data: profileData, loading: loadingUser } = useQuery(LOGGED_USER)
  const favoriteGenre = profileData?.me?.favoriteGenre
  const booksResponse = useQuery(ALL_BOOKS, {
      skip: !profileData, variables: { genre: favoriteGenre } 
    })

  if (!show) {
    return null
  }
  
  //if server has not yet got a response
  if (loadingUser || booksResponse.loading) {
    return <div>loading...</div>
  }
  return (
    <div>
      <h2>recommendations</h2>
      <div>
        <div>
          books in your favorite genre <strong>{profileData.me.favoriteGenre}</strong>
        </div>
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
            {booksResponse.data.allBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Recommend