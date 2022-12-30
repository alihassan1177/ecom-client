import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/User.jsx'
export default function UserDashboard() {
  const { user, logout } = useUser()
  const navigate = useNavigate()
  return (
    <div className='container'>
      <h1>Hello {user?.displayName}</h1>
      <button
        onClick={() => {
          logout()
          navigate("/")
        }}
        className="btn"
      >
        Logout
      </button>
    </div>
  )
}
