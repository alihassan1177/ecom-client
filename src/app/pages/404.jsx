import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      exit={{ opacity: 0 }}
      className="mt-8"
    >
      <h1 className="text-center text-6xl font-bold">404 Page not found</h1>
      <Link to="/" className="underline block mt-4 text-blue-500 text-center">
        Go to Home
      </Link>
    </motion.div>
  )
}
