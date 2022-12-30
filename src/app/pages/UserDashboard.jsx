import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/User.jsx'

export default function UserDashboard() {
  const { user, logout, getSales, sales } = useUser()
  const [loadingSales, setLoadingSales] = useState(true)

  useEffect(() => {
    const getData = async () => {
      await getSales()
      console.log('Ok i am done')
      setLoadingSales(false)
    }
    getData()
  }, [])

  const navigate = useNavigate()
  return (
    <div className="container">
      <h1>Hello {user?.displayName}</h1>
      {loadingSales
        ? 'Loading...'
        : sales.map((sale, index) => {
          return <p key={index}>{sale.timestamp.toDate().toUTCString()}</p>
        })}

      <button
        onClick={() => {
          logout()
          navigate('/')
        }}
        className="btn"
      >
        Logout
      </button>
    </div>
  )
}
