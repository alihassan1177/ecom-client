import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function Navigation() {
  return (
    <ul
      className={`md:items-center md:flex hidden flex-row md:relative bg-black md:max-w-max md:border-none`}
    >
      <li>
        <Link className="nav-link">Home</Link>
      </li>
      <li>
        <Link className="nav-link">Products</Link>
      </li>
      <li>
        <Link className="nav-link">About</Link>
      </li>
      <li>
        <Link className="nav-link">Contact</Link>
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
