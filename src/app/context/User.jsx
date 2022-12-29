import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { signInWithGoogle } from '../firebase'

const context = React.createContext()

export function useUser() {
  return useContext(context)
}

UserContext.propTypes = {
  children: PropTypes.any
}

export default function UserContext({ children }) {
  const USER_KEY = 'user'
  const localUser = JSON.parse(localStorage.getItem(USER_KEY))
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(localUser || {})

  async function handleAuth() {
    try {
      const userData = await signInWithGoogle()
      setUser(userData)
      setIsAuthenticated(true)
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }

  return (
    <context.Provider value={{ isAuthenticated, user, setIsAuthenticated, handleAuth }}>
      {children}
    </context.Provider>
  )
}
