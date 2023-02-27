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
import { Alert } from 'react-bootstrap'

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
        <BSHeader />
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<ProductsComponent isLoaded={loading} data={products} />} />
            <Route path="/product/:slug" element={<SingleProduct />} />
            <Route path="/design" element={<Design />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Products" element={<Products />} />
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

function ProductsComponent({ isLoaded, data }) {
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 30 }}
      className="container-fluid"
    >
     <div className="row row-cols-4 g-4">
        {isLoaded
          ? 'Loading'
          : data.map((product, index) => {
              return (
                <ProductCard
                  name={product.title}
                  id={product.id}
                  company={product.category}
                  key={index}
                  image={product.thumbnail}
                  price={product.price}
                  slug={product.slug}
                />
              )
            })}
      </div>
    </motion.div>
  )
}
