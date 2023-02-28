import React from 'react'
import { motion } from 'framer-motion'
import Breadcrumbs from '../components/Breadcrumbs'
export default function Products() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 , y : 30}}
      className="container h-screen"
    >
      <Breadcrumbs />
      <h1>Products Page</h1>
    </motion.div>
  )
}
