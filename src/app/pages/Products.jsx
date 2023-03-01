import React from 'react'
import { motion } from 'framer-motion'
import Breadcrumbs from '../components/Breadcrumbs'
import {useProducts} from "../context/Product.jsx"
import {ProductsComponent} from "../app.jsx"
export default function Products() {

  const {products, loading} = useProducts()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 , y : 30}}
      className="container-fluid h-screen"
    >
      <Breadcrumbs />
      <h1 className='mb-3'>All Products</h1>
      <ProductsComponent data={products} isLoaded={loading}  />
    </motion.div>
  )
}
