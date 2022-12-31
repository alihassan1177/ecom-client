import React from 'react'
import { motion } from 'framer-motion'
export default function Products() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 , y : 30}}
      className="container h-screen"
    >
      <h1>Products Page</h1>
    </motion.div>
  )
}
