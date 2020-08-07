import React, { useState, useEffect } from 'react'
import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'

const LoginForm = ({ show, setToken, setPage }) => {
  const [ password, setPassword ] = useState('')
  const [ username, setUsername ] = useState('')
  const [ login, result ] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])


  if (!show) {
    return null
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    login({ variables: { username: username.toString(), password: password.toString() } })

    setUsername('')
    setPassword('')
    setPage('authors')
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        name <input value={username} onChange={({ target }) => setUsername(target.value)} /> <br />
        password <input value={password} onChange={({ target }) => setPassword(target.value)} type='password' /> <br />
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm