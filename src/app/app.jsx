import React from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard.jsx'
import { useEffect } from 'react'
import CartContext from './context/Cart'
import { useProducts } from './context/Product'
import { MobileNavigation } from './components/Navigation'
import PropTypes from 'prop-types'
import { Routes, Route } from 'react-router-dom'
import SingleProduct from './pages/SingleProduct.jsx'

export default function App() {
  const { getProducts, loading, products, categories, filterByCategory } = useProducts()
  

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <main className="md:block flex flex-col md:max-h-full max-h-screen overflow-hidden">
      <CartContext>
        <Header />
        <Routes>
          <Route path="/" element={<ProductsComponent isLoaded={loading} data={filterByCategory("smartphones")} />} />
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
