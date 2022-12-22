import React, { useContext, useState } from "react"
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { context as CartContext } from "../context/Cart.jsx"
import PropTypes from "prop-types"

function increaseTotal(setTotalAmount, price, totalAmount) {
  setTotalAmount(price + totalAmount)
}

function decreaseTotal(setTotalAmount, totalAmount, price) {
  setTotalAmount(totalAmount - price)
}

ProductCard.propTypes = {
  name : PropTypes.string,
  company : PropTypes.string,
  image : PropTypes.string,
  id : PropTypes.number,
  price : PropTypes.number
}

export default function ProductCard({ name, company, image, id, price }) {
  const { setCart, cart, totalAmount, setTotalAmount } = useContext(CartContext)
  const product = {
    name: name,
    company: company,
    image: image,
    id: id,
    price: price
  }
  return <div className="flex gap-2 flex-col p-3 rounded-md border border-gray-300">
    <img className="w-full" src={image} alt={name} />
    <h2 className="font-semibold text-lg">{name}</h2>
    <h3 className="font-light text-sm">{company}</h3>
    <div className="flex gap-1">
      <button onClick={() => {
        const cartItems = cart.filter((item) => item.id == product.id)
        if (cartItems.length <= 0) {
          setCart((items) => [...items, product])
          increaseTotal(setTotalAmount, price, totalAmount)
        }

      }} className="btn w-full">Add to Cart</button>
      <button className="btn w-full">Quick View</button>
    </div>
  </div>
}


ProductCardRow.propTypes = {
  name : PropTypes.string,
  company : PropTypes.string,
  image : PropTypes.string,
  id : PropTypes.number,
  price : PropTypes.number
}

// Take quantity state into cart context prop

export function ProductCardRow({ name, company, id, image, price }) {
  const [quantity, setQuantity] = useState(1)
  const { cart, setCart, setTotalAmount, totalAmount } = useContext(CartContext)
  const [eachItemAmount, setEachItemAmount] = useState(price)

  function removeItemFromCart() {
    let index;
    cart.forEach((item, i) => {
      if (item.id == id) {
        index = i
        return
      }
    })
    const cartCopy = cart
    cartCopy.splice(index, 1);
    setTotalAmount(totalAmount - eachItemAmount)
    setCart(() => [...cartCopy])
    setEachItemAmount(0)
    setQuantity(0)
  }
  

  return <div key={id} className="flex gap-4 justify-center md:justify-start flex-wrap items-center justify-start p-3 rounded-md border border-gray-300">
    <img className="object-cover max-h-[180px]" src={image} alt={name} />
    <div>
      <h2 className="font-semibold text-lg">{name}</h2>
      <h3 className="font-light text-sm">{company}</h3>
      <h3 className="font-light text-sm">{price}</h3>
      <h3 className="font-light text-sm">Total Amount : {quantity * price}</h3>
    </div>
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 justify-between w-full">
        <button className="border p-1 rounded-md" onClick={() => {
          if (quantity <= 1) {
            setQuantity(1)
          } else {
            setQuantity(quantity - 1)
            setEachItemAmount(eachItemAmount - price)
            decreaseTotal(setTotalAmount, totalAmount, price)
          }
        }}><AiOutlineMinus /></button>
        <p>{quantity}</p>
        <button className="border p-1 rounded-md" onClick={() => {
          setQuantity(quantity + 1)
          setEachItemAmount(eachItemAmount + price)
          increaseTotal(setTotalAmount, price, totalAmount)
        }}><AiOutlinePlus /></button>
      </div>
      <button onClick={removeItemFromCart} className="btn">Remove from Cart</button>
    </div>
  </div>
}
