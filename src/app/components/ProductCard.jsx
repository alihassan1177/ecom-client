import React from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { useShoppingCart } from '../context/Cart.jsx'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ButtonGroup } from 'react-bootstrap'

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
          <button className="btn secondary" onClick={() => addItemInCart(product)}>
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
    <div style={{overflow : "hidden"}} className="card mb-3">
      <div className="row g-0">
        <div className="col-md-5">
          <img
            style={{ height: '100%', objectFit: 'cover' }}
            src={image}
            alt={name}
            className="img-fluid"
          />
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">
              Price : {price} <br /> <small>Total Amount : {item.quantity * price}</small>{' '}
            </p>
            <p className="card-text"></p>
            <ButtonGroup className="border" style={{ width: '100%' }}>
              <button
                className="btn border-end btn-light"
                onClick={() => {
                  if (item.quantity <= 1) {
                    removeItemFromCart(id, item, price)
                  } else {
                    decreaseQuantity(item)
                    decreaseTotal(setTotalAmount, totalAmount, price)
                  }
                }}
              >
                <AiOutlineMinus />
              </button>
              <p style={{ width: '60%' }} className="my-auto text-center">
                {item.quantity}
              </p>
              <button
                className="btn border-start btn-light"
                onClick={() => {
                  increaseQuantity(item)
                  increaseTotal(setTotalAmount, price, totalAmount)
                }}
              >
                <AiOutlinePlus />
              </button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  )
}
