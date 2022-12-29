import React, { useState, useContext } from 'react'
import Navigation from './Navigation.jsx'
import PropTypes from 'prop-types'
import { ProductCardRow } from './ProductCard.jsx'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { context as CartContext } from '../context/Cart.jsx'
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import Modal from './Modal.jsx'
import GoogleIcon from '/images/google.png'
import { useUser } from '../context/User.jsx'

export default function Header() {
  const [cartExpanded, setCartExpanded] = useState(false)
  const { cart } = useContext(CartContext)
  const [authModal, setAuthModal] = useState(false)

  const { isAuthenticated } = useUser()

  if (cartExpanded) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflowY = 'auto'
  }

  return (
    <header className="py-8 px-3">
      <nav className="flex container text-black items-center gap-6 justify-between">
        <Link className="block flex-1 font-bold uppercase text-3xl" to="/">
          Boldo.
        </Link>
        <Navigation />
        {isAuthenticated ? (
          <Link className="relative text-3xl block" to="/user">
            <AiOutlineUser />
          </Link>
        ) : (
          <button
            onClick={() => {
              if (isAuthenticated == false) {
                setAuthModal(true)
              }
            }}
            className="relative text-3xl block"
          >
            <AiOutlineUser />
          </button>
        )}
        <button
          onClick={() => {
            setCartExpanded(true)
          }}
          data-total={cart.length}
          className="cart-btn relative text-3xl block"
        >
          <AiOutlineShoppingCart />
        </button>
        <Modal
          show={authModal}
          message={'Signin using your Google Account to keep track of your orders'}
          title={'Connect your Google Account'}
          setShow={setAuthModal}
        >
          <button className="cursor-pointer rounded-md w-full hover:bg-slate-50 transition-all shadow-md border border-gray-300 font-semibold p-3 flex gap-3 items-center justify-center">
            <img className="w-10" alt="Google" src={GoogleIcon} />
            <span>Continue with Google</span>
          </button>
        </Modal>
        <Cart cartOpen={cartExpanded} setCart={setCartExpanded} />
      </nav>
    </header>
  )
}

function Cart({ cartOpen, setCart }) {
  const { cart, totalAmount } = useContext(CartContext)

  return (
    <div className={cartOpen ? 'block' : 'hidden'}>
      <div className={`bg-white absolute z-10  overflow-auto text-black inset-0`}>
        <div className="container mt-4">
          <div className="flex justify-between">
            <h2 className="font-semibold text-3xl">Cart Items</h2>
            <button
              onClick={() => {
                setCart(false)
                document.body.style.overflowY = 'auto'
              }}
              className="text-2xl"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex flex-col my-4 gap-3">
            {cart.map((product, index) => {
              return (
                <ProductCardRow
                  key={index}
                  name={product.name}
                  company={product.company}
                  image={product.image}
                  id={product.id}
                  price={product.price}
                />
              )
            })}
          </div>
          <h2 className="font-semibold text-3xl">Total Amount : {totalAmount} </h2>
        </div>
      </div>
    </div>
  )
}

Cart.propTypes = {
  cartOpen: PropTypes.any,
  setCart: PropTypes.any
}
