import React from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard.jsx'
import { useState, useEffect } from 'react'
import CartContext from './context/Cart'
import { useProducts } from './context/Product'
import { MobileNavigation } from './components/Navigation'
import PropTypes from 'prop-types'
import { Routes, Route } from 'react-router-dom'
import SingleProduct from './pages/SingleProduct.jsx'

export default function App() {
  const { products, addProducts } = useProducts()
  const [loading, setLoading] = useState(true)

  async function getProducts() {
    if (products.length > 0) {
      setLoading(false)
      return
    }
    const response = await fetch('https://dummyjson.com/products?limit=100')
    const data = await response.json()
    setLoading(false)
    const productsData = data.products.map((product) => {
      const slug = `${product.title}-${product.brand}-${product.category}-${product.id}`.split(" ").join("-").toLowerCase() 
      return Object.assign(product, { slug: slug })
    })
    addProducts(productsData)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <main className="md:block flex flex-col md:max-h-full max-h-screen overflow-hidden">
      <CartContext>
        <Header />
        <Routes>
          <Route path="/" element={<ProductsComponent isLoaded={loading} data={products} />} />
          <Route path="/product/:slug" element={<SingleProduct />} />
        </Routes>
        <MobileNavigation />
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
    <div className="mt-3 md:container md:h-full flex-1 overflow-y-auto">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2">
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
    </div>
  )
}
