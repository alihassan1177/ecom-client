import React from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard.jsx'
import { useState, useEffect } from 'react'
import CartContext from './context/Cart'
import {useProducts} from "./context/Product"

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
    <>
      <CartContext>
        <Header />
        <div className="mt-3 container">
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
      </CartContext>
    </>
  )
}
