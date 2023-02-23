import React, { useState, useContext, useEffect } from 'react'
import Navigation from './Navigation.jsx'
import PropTypes from 'prop-types'
import { ProductCardRow } from './ProductCard.jsx'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { context as CartContext, useShoppingCart } from '../context/Cart.jsx'
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineMenu } from 'react-icons/ai'
import Modal from './Modal.jsx'
import GoogleIcon from '/images/google.png'
import { useUser } from '../context/User.jsx'
import { useNavigate } from 'react-router-dom'

import { Navbar, Nav, Offcanvas } from 'react-bootstrap'

function BSNavigation() {
  return (
    <Nav className="me-auto flex-column flex-md-row">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
    </Nav>
  )
}

export function BSHeader() {
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const { cart } = useContext(CartContext)

  return (
    <header className="container-fluid">
      <Navbar expand="md">
        <Navbar.Brand className="fw-bold" style={{fontSize: "24px"}}  href="#home">Boldo.</Navbar.Brand>
        <button
          style={{ fontSize: '30px' }}
          onClick={() => setMenuOpen(true)}
          className="btn ms-auto d-md-none"
        >
          <AiOutlineMenu />
        </button>
        <button
          style={{ fontSize: '30px' }}
          data-total={cart.length}
          onClick={() => setCartOpen(true)}
          className="btn d-md-none cart-btn"
        >
          <AiOutlineShoppingCart />
        </button>
        <Navbar.Collapse>
          <BSNavigation />
        </Navbar.Collapse>
        <button
          style={{ fontSize: '30px' }}
          data-total={cart.length}
          onClick={() => setCartOpen(true)}
          className="btn d-none d-md-block cart-btn"
        >
          <AiOutlineShoppingCart />
        </button>
      </Navbar>
      <Offcanvas show={menuOpen} placement="end" onHide={() => setMenuOpen(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <BSNavigation />  
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas show={cartOpen} placement="end" onHide={() => setCartOpen(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
             {cart.length > 0 ? cart.map((product, index) => {
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
            }) : <p className='lead text-danger'>No Products in Cart</p>}
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  )
}


export default function Header() {
  const [cartExpanded, setCartExpanded] = useState(false)
  const { cart } = useContext(CartContext)
  const [authModal, setAuthModal] = useState(false)
  const navigate = useNavigate()

  const { isAuthenticated, handleAuth } = useUser()

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
          <button
            onClick={async () => {
              const status = await handleAuth()
              setAuthModal(!status)
              navigate('/user')
            }}
            className="cursor-pointer rounded-md w-full hover:bg-slate-50 transition-all shadow-md border border-gray-300 font-semibold p-3 flex gap-3 items-center justify-center"
          >
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
  const { cart, totalAmount, checkout } = useShoppingCart()
  const [authModal, setAuthModal] = useState(false)

  const { isAuthenticated, handleAuth, user } = useUser()

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
          <Modal
            show={authModal}
            message={'Signin using your Google Account to keep track of your orders'}
            title={'Connect your Google Account'}
            setShow={setAuthModal}
          >
            <button
              onClick={async () => {
                const result = await handleAuth()
                console.log(result)
                setAuthModal(!result.status)
                checkout(result.userData)
              }}
              className="cursor-pointer rounded-md w-full hover:bg-slate-50 transition-all shadow-md border border-gray-300 font-semibold p-3 flex gap-3 items-center justify-center"
            >
              <img className="w-10" alt="Google" src={GoogleIcon} />
              <span>Continue with Google</span>
            </button>
          </Modal>
          <h2 className="font-semibold text-3xl">Total Amount : {totalAmount} </h2>
          <button
            onClick={() => {
              if (isAuthenticated == true) {
                checkout(user)
              } else {
                setAuthModal(true)
              }
            }}
            className="btn secondary mt-3"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

Cart.propTypes = {
  cartOpen: PropTypes.any,
  setCart: PropTypes.any
}
