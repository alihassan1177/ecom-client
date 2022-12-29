import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='mt-8'>
      <h1 className="text-center text-6xl font-bold">404 Page not found</h1>
      <Link to="/" className="underline block mt-4 text-blue-500 text-center">
        Go to Home
      </Link>
    </div>
  )
}
