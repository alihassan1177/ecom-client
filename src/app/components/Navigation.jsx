import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function Navigation() {
  return (
    <ul
      className={`md:items-center md:flex hidden flex-row md:relative md:max-w-max md:border-none`}
    >
      <li>
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/products" className="nav-link">
          Products
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className="nav-link">
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className="nav-link">
          Contact
        </NavLink>
      </li>
    </ul>
  )
}

Navigation.propTypes = {
  navExpanded: PropTypes.bool
}

export function MobileNavigation() {
  return (
    <ul className={`md:hidden h-[80px] text-white flex flex-row bg-black w-full`}>
      <li>
        <Link className="nav-link mobile">Home</Link>
      </li>
      <li>
        <Link className="nav-link mobile">Products</Link>
      </li>
      <li>
        <Link className="nav-link mobile">About</Link>
      </li>
      <li>
        <Link className="nav-link mobile">Contact</Link>
      </li>
    </ul>
  )
}
