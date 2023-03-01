import React, { useState } from 'react'
import { BSHeader } from './components/Header'
import ProductCard from './components/ProductCard.jsx'
import { useEffect } from 'react'
import CartContext from './context/Cart'
import { useProducts } from './context/Product'
import PropTypes from 'prop-types'
import { Routes, Route, useLocation } from 'react-router-dom'
import SingleProduct from './pages/SingleProduct.jsx'
import UserDashboard from './pages/UserDashboard'
import { useUser } from './context/User'
import NotFound from './pages/404'
import About from './pages/About'
import Contact from './pages/Contact'
import Products from './pages/Products'
import { AnimatePresence, motion } from 'framer-motion'
import Design from './pages/design'
import ScrollToTop from './components/ScrollToTop'
export default function App() {
  const { getProducts, loading, products } = useProducts()
  const { isAuthenticated } = useUser()
  const location = useLocation()

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <main className="md:block flex flex-col md:max-h-full max-h-screen overflow-hidden">
      <CartContext>
        <ScrollToTop />
        <BSHeader />
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<div className='container-fluid'> <ProductsComponent isLoaded={loading} data={products} /> </div>} />
            <Route path="/products/:slug" element={<SingleProduct />} />
            <Route path="/design" element={<Design />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            {isAuthenticated ? <Route path="/user" element={<UserDashboard />} /> : ''}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </CartContext>
    </main>
  )
}

ProductsComponent.propTypes = {
  isLoaded: PropTypes.any,
  data: PropTypes.any
}

export function ProductsComponent({ isLoaded, data }) {
  
  console.log(data)

  function sliceIntoChunks(arr, chunkSize) {
    const res = []
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize)
      res.push(chunk)
    }
    return res
  }

  function renderProducts() {
    return data.map((product) => {
      return (
        <ProductCard
          name={product.title}
          id={product.id}
          company={product.category}
          key={product.id}
          image={product.thumbnail}
          price={product.price}
          slug={product.slug}
        />
      )
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 30 }}
    >
      <div className="row row-cols-2 row-cols-lg-4 g-4">
        {isLoaded ? 'Loading' : renderProducts()}
      </div>
    </motion.div>
  )
}
