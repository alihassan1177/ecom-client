import React, { useContext, useState } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { useShoppingCart } from '../context/Cart.jsx'
import PropTypes from 'prop-types'

function increaseTotal(setTotalAmount, price, totalAmount) {
  setTotalAmount(price + totalAmount)
}

function decreaseTotal(setTotalAmount, totalAmount, price) {
  setTotalAmount(totalAmount - price)
}

ProductCard.propTypes = {
  name: PropTypes.string,
  company: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.number,
  price: PropTypes.number
}

export default function ProductCard({ name, company, image, id, price }) {
  const { setCart, cart, totalAmount, setTotalAmount } = useShoppingCart()
  const product = {
    name: name,
    company: company,
    image: image,
    id: id,
    price: price,
    quantity: 1
  }
  return (
    <div className="flex gap-2 flex-col p-3 rounded-md border border-gray-300">
      <img className="w-full" src={image} alt={name} />
      <h2 className="font-semibold text-lg">{name}</h2>
      <h3 className="font-light text-sm">{company}</h3>
      <div className="flex gap-1">
        <button
          onClick={() => {
            const cartItems = cart.filter((item) => item.id == product.id)
            if (cartItems.length <= 0) {
              setCart((items) => [...items, product])
              increaseTotal(setTotalAmount, price, totalAmount)
            }
          }}
          className="btn w-full"
        >
          Add to Cart
        </button>
        <button className="btn w-full">Quick View</button>
      </div>
    </div>
  )
}

ProductCardRow.propTypes = {
  name: PropTypes.string,
  company: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.number,
  price: PropTypes.number
}


export function ProductCardRow({ name, company, id, image, price }) {
  const { cart, setCart, setTotalAmount, totalAmount, getItemIndex, getItem } = useShoppingCart()
  const item = getItem(id)
  function removeItemFromCart() {
    const index = getItemIndex(id)
    setTotalAmount(totalAmount - item.quantity * price)
    cart.splice(index, 1)

    setCart(() => [...cart])
  }

  function increaseQuantity() {
    item.quantity++
    setCart(() => [...cart])
  }

  function decreaseQuantity() {
    item.quantity--
    setCart(() => [...cart])
  }

  return (
    <div
      key={id}
      className="flex gap-4 justify-center md:justify-start flex-wrap items-center justify-start p-3 rounded-md border border-gray-300"
    >
      <img className="object-cover max-h-[180px]" src={image} alt={name} />
      <div>
        <h2 className="font-semibold text-lg">{name}</h2>
        <h3 className="font-light text-sm">{company}</h3>
        <h3 className="font-light text-sm">{price}</h3>
        <h3 className="font-light text-sm">Total Amount : {item.quantity * price}</h3>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 justify-between w-full">
          <button
            className="border p-1 rounded-md"
            onClick={() => {
              if (item.quantity <= 1) {
                item.quantity = 1
              } else {
                decreaseQuantity()
                decreaseTotal(setTotalAmount, totalAmount, price)
              }
            }}
          >
            <AiOutlineMinus />
          </button>
          <p>{item.quantity}</p>
          <button
            className="border p-1 rounded-md"
            onClick={() => {
              increaseQuantity()
              increaseTotal(setTotalAmount, price, totalAmount)
            }}
          >
            <AiOutlinePlus />
          </button>
        </div>
        <button onClick={removeItemFromCart} className="btn">
          Remove from Cart
        </button>
      </div>
    </div>
  )
}
