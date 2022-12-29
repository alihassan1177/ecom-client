import React from 'react'
import {useUser} from '../context/User.jsx'
export default function UserDashboard() {
  const {user} = useUser()
  return <h1>Hello {user?.displayName}</h1>
}
