import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

const context = React.createContext()

export function useUser() {
  return useContext(context)
}

UserContext.propTypes = {
  children : PropTypes.any
}

export default function UserContext({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return <context.Provider value={{isAuthenticated, setIsAuthenticated}}>{children}</context.Provider>
}
