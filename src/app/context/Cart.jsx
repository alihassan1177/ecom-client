import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { addDoc, collection } from 'firebase/firestore'
import { useUser } from './User'
import {db, SALES_COLLECTION_KEY} from '../firebase.js'
export const context = React.createContext()

export function useShoppingCart() {
  return useContext(context)
}

CartContext.propTypes = {
  children: PropTypes.any
}

export default function CartContext({ children }) {
  const CART_KEY = 'cart'
  const localCart = JSON.parse(localStorage.getItem(CART_KEY))
  const [cart, setCart] = useState(localCart || [])
  const [totalAmount, setTotalAmount] = useState(getTotalAmount())
  const {user} = useUser()

  function getTotalAmount() {
    if (cart.length > 0) {
      let total = 0
      for (let i = 0; i < cart.length; i++) {
        const item = cart[i]
        const eachItemAmount = item.price * item.quantity
        total += eachItemAmount
      }
      return total
    }
    return 0
  }

  function getItemIndex(id) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == id) {
        return i
      }
    }
  }

  async function checkout(uid){
    const data = {cart : cart, total : totalAmount, user : uid || user.uid}
    const response = await addDoc(collection(db, SALES_COLLECTION_KEY), data)
    console.log(response)
    setCart(()=>[])
    setTotalAmount(0)
    localStorage.setItem(CART_KEY, JSON.stringify([]))
  }

  function addItemInCart(product) {
    const cartItems = cart.filter((item) => item.id == product.id)
    if (cartItems.length <= 0) {
      setCart((items) => [...items, product])
      localStorage.setItem(CART_KEY, JSON.stringify([...cart, product]))
      increaseTotal(setTotalAmount, product.price, totalAmount)
    }
  }

  function increaseTotal(setTotalAmount, price, totalAmount) {
    setTotalAmount(price + totalAmount)
  }

  function decreaseTotal(setTotalAmount, totalAmount, price) {
    setTotalAmount(totalAmount - price)
  }

  function getItem(id) {
    const index = getItemIndex(id)
    return cart[index]
  }

  function removeItemFromCart(id, item, price) {
    const index = getItemIndex(id)
    setTotalAmount(totalAmount - item.quantity * price)
    cart.splice(index, 1)
    setCart(() => [...cart])
    localStorage.setItem(CART_KEY, JSON.stringify([...cart]))
  }

  function increaseQuantity(item) {
    item.quantity++
    setCart(() => [...cart])
    localStorage.setItem(CART_KEY, JSON.stringify([...cart]))
  }

  function decreaseQuantity(item) {
    item.quantity--
    setCart(() => [...cart])
    localStorage.setItem(CART_KEY, JSON.stringify([...cart]))
  }

  return (
    <context.Provider
      value={{
        cart,
        setCart,
        totalAmount,
        setTotalAmount,
        addItemInCart,
        getItemIndex,
        getItem,
        increaseTotal,
        decreaseTotal,
        increaseQuantity,
        decreaseQuantity,
        removeItemFromCart,
        checkout
      }}
    >
      {children}
    </context.Provider>
  )
}
