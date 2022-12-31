import React from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      exit={{ opacity: 0 }}
      className="container"
    >
      <h1>Contact Page</h1>
    </motion.div>
  )
}
