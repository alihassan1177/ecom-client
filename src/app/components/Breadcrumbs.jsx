import React from "react"
import { useLocation, Link } from "react-router-dom"

export default function Breadcrumbs() {
  const location = useLocation()

  let currentLink = ''

  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
      currentLink += `/${crumb}`

      return (
          <Link className="crumb" key={crumb}  to={currentLink}>{crumb}</Link>
      )
    })

  return (
    <div className="breadcrumbs mb-3">
      <Link className="crumb" to="/">Home</Link>
      {crumbs}
    </div>
  )
}
