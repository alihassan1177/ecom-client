import React from 'react'
import {Link} from "react-router-dom"
import PropTypes from "prop-types"

export default function Navigation({navExpanded}) {
  return (
    <ul
      className={` left-0 md:items-center ${navExpanded ? 'flex' : 'hidden md:flex'
        }  fixed left-0 flex-row md:relative nav-position  bg-black w-full md:max-w-max md:border-none`}
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
  navExpanded : PropTypes.bool
}


