import React, { useRef } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { useShoppingCart } from '../context/Cart.jsx'
import PropTypes from 'prop-types'
import { ButtonGroup } from 'react-bootstrap'
import { Card } from 'react-bootstrap'

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
    <div title={`${name} - ${company}`} className="col">
      <Card>
        <Card.Img style={{ height: '200px', objectFit: 'cover' }} variant="top" src={image} />
        <Card.Body style={{ textTransform: 'capitalize' }}>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <small>
              category : {company} <br /> price : <strong>${price}</strong>{' '}
            </small>{' '}
          </Card.Text>
          <button
            onClick={() => {
              addItemInCart(product)
            }}
            className="btn btn-dark"
          >
            Add to Cart
          </button>
        </Card.Body>
      </Card>
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

  const itemRef = useRef()

  return (
    <div ref={itemRef} style={{ overflow: 'hidden' }} className="card mb-3">
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
                    itemRef.current.classList.add('scale-down')
                    removeItemFromCart(id, item, price)
                    console.log(itemRef.current)
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
