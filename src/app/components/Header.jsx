import React, { useState, useContext, useRef, useEffect } from 'react'
import Navigation from './Navigation.jsx'
import PropTypes from 'prop-types'
import { ProductCardRow } from './ProductCard.jsx'
import { Link, useLocation, useParams } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { context as CartContext, useShoppingCart } from '../context/Cart.jsx'
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineClose
} from 'react-icons/ai'
import GoogleIcon from '/images/google.png'
import { useUser } from '../context/User.jsx'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useProducts } from '../context/Product.jsx'
import { Navbar, Nav, Offcanvas, Modal } from 'react-bootstrap'

BSNavigation.propTypes = {
  setMenuOpen: PropTypes.any
}

function BSNavigation({ setMenuOpen }) {
  function handleRoute() {
    setMenuOpen(false)
  }

  return (
    <Nav className="me-auto flex-column flex-md-row">
      <NavLink className="nav-link" onClick={handleRoute} to="/">
        Home
      </NavLink>
      <NavLink className="nav-link" onClick={handleRoute} to="/products">
        Products
      </NavLink>
    </Nav>
  )
}

Searchbar.propTypes = {
  visible: PropTypes.any
}

function Searchbar({ visible }) {
  const navigate = useNavigate()
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [value, setValue] = useState('')
  const formRef = useRef()

  const { products } = useProducts()

  const filteredItems = products.filter((item) => {
    return item.category.toLowerCase().includes(value.toLowerCase()) || item.title.toLowerCase().includes(value.toLowerCase())
  }).slice(0, 10)

  function handleSubmit(e) {
    e.preventDefault()
    console.log(value)
    navigate(`/products/`)
  }

  useEffect(() => {
    console.log(filteredItems)
  }, [value])

  return (
    <div
      className={
        visible ? 'searchbar visible d-none d-md-block' : 'searchbar invisible d-none d-md-block'
      }
    >
      <form ref={formRef} onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search Products..."
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
          type="text"
          className="searchbar-input"
        />
      </form>
      <ul className={`suggestions ${showSuggestions ? 'show' : 'hide'}`}>
        {filteredItems != null ? filteredItems.map(item => {
          return <li
            key={item.id}
            onClick={() => {
              setValue(item.title)
              formRef.current.requestSubmit()
            }}
            className="suggestion-item"
          >
            {item.title}
          </li>
        }) : "No Products"}
      </ul>
    </div>
  )
}

export function BSHeader() {
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchbarOpen, setSearchbarOpen] = useState(false)

  const [authModal, setAuthModal] = useState(false)
  const { isAuthenticated, handleAuth } = useUser()

  const navigate = useNavigate()
  const { cart } = useContext(CartContext)

  const authButton = useRef()

  async function handleGoogleAuth() {
    const span = authButton.current.children[1]
    span.innerText = 'Processing...'
    authButton.current.classList.add('disabled')
    const status = await handleAuth()
    authButton.current.classList.remove('disabled')
    console.log(status)
    if (status.status == true) {
      navigate('/user')
      setAuthModal(false)
    } else {
      span.innerText = 'Continue with Google'
    }
  }

  useEffect(() => {
    console.log('Header Component')
  }, [])

  return (
    <header style={{ marginBottom: '100px' }}>
      <Modal centered show={authModal} onHide={() => setAuthModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Login</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ paddingBlock: '24px' }}>
          <p className="text-center px-3">
            Connect your Google Account to keep track of your orders and payments
          </p>
          <button
            ref={authButton}
            onClick={async () => await handleGoogleAuth()}
            style={{ width: '100%' }}
            className="btn btn-md btn-light border"
          >
            <img style={{ width: '36px' }} className="me-2" alt="Google" src={GoogleIcon} />
            <span>Continue with Google</span>
          </button>
        </Modal.Body>
      </Modal>
      <Navbar fixed="top" className="bg-white shadow-sm  border-bottom" expand="md">
        <div className="container-fluid">
          <Navbar.Brand
            onClick={(e) => {
              e.preventDefault()
              navigate('/')
            }}
            className="fw-bold"
            style={{ fontSize: '28px' }}
            href="/"
          >
            Boldo.
          </Navbar.Brand>
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
            className="btn d-md-none me-2 cart-btn"
          >
            <AiOutlineShoppingCart />
          </button>
          <Navbar.Collapse>
            <BSNavigation setMenuOpen={setMenuOpen} />
          </Navbar.Collapse>
          <Searchbar visible={searchbarOpen} />
          <button
            style={{ fontSize: '30px' }}
            onClick={() => setSearchbarOpen((prev) => !prev)}
            className="btn d-none d-md-block"
          >
            {searchbarOpen ? <AiOutlineClose /> : <AiOutlineSearch />}
          </button>
          <button
            style={{ fontSize: '30px' }}
            data-total={cart.length}
            onClick={() => setCartOpen(true)}
            className="btn d-none d-md-block me-2 cart-btn"
          >
            <AiOutlineShoppingCart />
          </button>
          {isAuthenticated ? (
            <Link style={{ fontSize: '30px', marginRight: '-0.80rem' }} className="btn" to="/user">
              <AiOutlineUser />
            </Link>
          ) : (
            <button
              onClick={() => {
                if (isAuthenticated == false) {
                  setAuthModal(true)
                }
              }}
              style={{ fontSize: '30px', marginRight: '-0.80rem' }}
              className="btn"
            >
              <AiOutlineUser />
            </button>
          )}
        </div>
      </Navbar>
      <Offcanvas show={menuOpen} placement="end" onHide={() => setMenuOpen(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Navbar>
            <BSNavigation setMenuOpen={setMenuOpen} />
          </Navbar>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas show={cartOpen} placement="end" onHide={() => setCartOpen(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.length > 0 ? (
            cart.map((product, index) => {
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
            })
          ) : (
            <p className="lead text-danger">No Products in Cart</p>
          )}
          {cart.length > 0 ? (
            <Link onClick={() => setCartOpen(false)} to="/checkout">
              Go to Checkout Page
            </Link>
          ) : (
            ''
          )}
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
