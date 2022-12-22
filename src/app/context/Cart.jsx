import React, { useState } from "react";

export const context = React.createContext()

export default function CartContext({ children }) {

  const [cart, setCart] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  return <context.Provider
    value={{ cart, setCart, totalAmount, setTotalAmount }}>
    {children}
  </context.Provider>
}
