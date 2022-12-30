import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { signInWithGoogle } from '../firebase'
import { query, collection, where, getDocs } from 'firebase/firestore'
import { db, SALES_COLLECTION_KEY } from '../firebase.js'

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
  const [sales, setSales] = useState([])

  async function handleAuth() {
    try {
      const userData = await signInWithGoogle()
      setUser(userData)
      localStorage.setItem(USER_KEY, JSON.stringify(userData))
      setIsAuthenticated(true)
      return { status: true, userData: userData }
    } catch (e) {
      return { status: false, userData: null }
    }
  }

  async function getSales() {
    const firebaseQuery = query(collection(db, SALES_COLLECTION_KEY), where('user', '==', user.uid))
    const data = await getDocs(firebaseQuery)
    const docs = []
    data.forEach((doc) => {
      docs.push(doc.data())
    })
    setSales(() => [...docs])
  }

  function logout() {
    setIsAuthenticated(false)
    setUser({})
    localStorage.removeItem(USER_KEY)
  }

  return (
    <context.Provider
      value={{
        isAuthenticated,
        user,
        logout,
        setIsAuthenticated,
        handleAuth,
        sales,
        getSales,
        setSales
      }}
    >
      {children}
    </context.Provider>
  )
}
