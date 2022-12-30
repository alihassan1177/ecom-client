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
  const [isAuthenticated, setIsAuthenticated] = useState(localUser ? true : false)
  const [user, setUser] = useState(localUser || {})

  async function handleAuth() {
    try {
      const userData = await signInWithGoogle()
      setUser(userData)
      localStorage.setItem(USER_KEY, JSON.stringify(userData))
      setIsAuthenticated(true)
      return {status :true, uid : userData.uid}
    } catch (e) {
      console.log(e)
      return {status :false, uid : null}
    }
  }

  function logout(){
    setIsAuthenticated(false)
    setUser({})
    localStorage.removeItem(USER_KEY)
  }

  return (
    <context.Provider value={{ isAuthenticated, user, logout, setIsAuthenticated, handleAuth }}>
      {children}
    </context.Provider>
  )
}
