import React from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard.jsx'
import { useState, useEffect } from 'react'
import CartContext from './context/Cart'
import { useProducts } from './context/Product'
import { MobileNavigation } from './components/Navigation'

export default function App() {
  const { products, setProducts } = useProducts()
  const [loading, setLoading] = useState(true)

  async function getProducts() {
    const response = await fetch('https://dummyjson.com/products?limit=100')
    const data = await response.json()
    setProducts(() => [...data.products])
    setLoading(false)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <main className='md:block flex flex-col md:max-h-full max-h-screen overflow-hidden'>
      <CartContext>
        <Header />
        <div className="mt-3 md:container md:h-full flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2">
            {loading
              ? 'Loading'
              : products.map((product, index) => {
                return (
                  <ProductCard
                    name={product.title}
                    id={product.id}
                    company={product.category}
                    key={index}
                    image={product.thumbnail}
                    price={product.price}
                  />
                )
              })}
          </div>
        </div>
        <MobileNavigation />
      </CartContext>
    </main>
  )
}
