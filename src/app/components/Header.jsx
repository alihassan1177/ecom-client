import  React, { useState, useContext } from "react";
import PropTypes from "prop-types"
import { ProductCardRow } from "./ProductCard.jsx"
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa"
import { context as CartContext } from "../context/Cart.jsx"

export default function Header() {
  const [navExpanded, setNavExpanded] = useState(false);
  const [cartExpanded, setCartExpanded] = useState(false);
  const { cart } = useContext(CartContext)

  if (cartExpanded) {
    document.body.style.overflow = "hidden"
  }

  return (
    <header className="py-4 px-3 md:p-0 bg-black">
      <nav className="flex text-white items-center gap-6 justify-between">
        <Link className="block flex-1 ml-3 font-bold text-2xl" to="/">
          Boldo.
        </Link>
        <button
          onClick={() => {
            setCartExpanded(true)
          }}
          data-total={cart.length}
          className="cart-btn relative text-2xl block"><FaShoppingCart /></button>
        <Cart
          cartOpen={cartExpanded}
          setCart={setCartExpanded}
        />
        <button
          onClick={() => setNavExpanded(!navExpanded)}
          className="md:hidden text-2xl block"
        >
          {
            !navExpanded ? <FaBars /> : <FaTimes />
          }
        </button>
        <ul
          className={` left-0 md:items-center ${navExpanded ? "flex" : "hidden md:flex"
            }  text-center flex-col md:flex-row absolute md:relative bg-black w-full md:max-w-max md:top-0 top-14 md:border-none border-t border-white`}
        >
          <li>
            <Link className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link">
              Products
            </Link>
          </li>
          <li>
            <Link className="nav-link">
              About
            </Link>
          </li>
          <li>
            <Link className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}


function Cart({ cartOpen, setCart }) {

  const { cart, totalAmount } = useContext(CartContext)

  return <div className={cartOpen ? "block" : "hidden"}>
    <div className={`bg-white absolute z-10  overflow-auto text-black inset-0`}>
      <div className="container mt-4">
        <div className="flex justify-between">
          <h2 className="font-semibold text-3xl">Cart Items</h2>
          <button
            onClick={() => {
              setCart(false)
              document.body.style.overflowY = "auto"
            }}
            className="text-2xl"><FaTimes /></button>
        </div>
        <div className="flex flex-col my-4 gap-3">
          {cart.map((product, index) => {
            return <ProductCardRow
              key={index}
              name={product.name}
              company={product.company}
              image={product.image}
              id={product.id}
              price={product.price}
            />
          })}
        </div>
        <h2 className="font-semibold text-3xl">Total Amount : {totalAmount} </h2>
      </div>
    </div>
  </div>
}

Cart.propTypes = {
  cartOpen : PropTypes.any,
  setCart : PropTypes.any
}

