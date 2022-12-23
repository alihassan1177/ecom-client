import React, {useContext, useState} from "react"
import PropTypes from "prop-types"

const context = React.createContext()

export function useProducts(){
  return useContext(context)
}

ProductContext.propTypes = {
  children : PropTypes.any
}

export default function ProductContext({children}){
  const [products, setProducts] = useState([])
  
  return <context.Provider value={{products, setProducts}}>{children}</context.Provider>
}
