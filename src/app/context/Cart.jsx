import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

export const context = React.createContext()

export function useShoppingCart() {
  return useContext(context)
}

CartContext.propTypes = {
  children: PropTypes.any
}

export default function CartContext({ children }) {
  const [cart, setCart] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  function getItemIndex(id) {
    for(let i = 0; i < cart.length; i++){
      if(cart[i].id == id){
        return i
      }
    }
  }
  
  function getItem(id){
    const index = getItemIndex(id)
    return cart[index]
  }

  return (
    <context.Provider value={{ cart, setCart, totalAmount, setTotalAmount, getItemIndex, getItem }}>
      {children}
    </context.Provider>
  )
}
