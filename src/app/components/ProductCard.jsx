import React from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { useShoppingCart } from '../context/Cart.jsx'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

ProductCard.propTypes = {
  name: PropTypes.string,
  company: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.number,
  price: PropTypes.number,
  slug: PropTypes.string
}

export default function ProductCard({ name, company, image, id, price, slug }) {
  const { addItemInCart } = useShoppingCart()
  const product = {
    name: name,
    company: company,
    image: image,
    id: id,
    price: price,
    quantity: 1
  }

  return (
    <Link
      to={`/product/${slug}`}
      title={`${name} - ${company}`}
      className="flex gap-2 transition-all cursor-pointer flex-col overflow-hidden rounded-md border border-gray-300"
    >
      <img
        loading="lazy"
        className="w-full h-[200px] object-cover m-0 p-0 block"
        src={image}
        alt={name}
      />
      <div className="p-4 border-t -mt-2 border-gray-300">
        <h3 className="font-light capitalize text-[13px]">{company}</h3>
        <h2 className="font-semibold capitalize truncate text-lg">{name}</h2>
        <div className="flex justify-between items-center mt-3">
          <h3 className="font-semibold capitalize text-3xl">${price}</h3>
          <button onClick={() => addItemInCart(product)} className="btn max-w-max">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
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
  const {
    setTotalAmount,
    totalAmount,
    getItem,
    removeItemFromCart,
    increaseQuantity,
    decreaseQuantity,
    increaseTotal,
    decreaseTotal
  } = useShoppingCart()
  const item = getItem(id)
  
  return (
    <div
      key={id}
      className="flex gap-4 justify-center md:justify-start flex-wrap items-center justify-start p-3 rounded-md border border-gray-300"
    >
      <img className="object-cover w-[280px] max-h-[180px]" src={image} alt={name} />
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
                decreaseQuantity(item)
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
              increaseQuantity(item)
              increaseTotal(setTotalAmount, price, totalAmount)
            }}
          >
            <AiOutlinePlus />
          </button>
        </div>
        <button onClick={() => removeItemFromCart(id, item, price)} className="btn">
          Remove from Cart
        </button>
      </div>
    </div>
  )
}
