import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

const context = React.createContext()

export function useProducts() {
  return useContext(context)
}

ProductContext.propTypes = {
  children: PropTypes.any
}

export default function ProductContext({ children }) {
  const PRODUCTS_KEY = 'products'
  const localData = JSON.parse(localStorage.getItem(PRODUCTS_KEY))
  const [products, setProducts] = useState(localData || [])
  const [loading, setLoading] = useState(true)

  function addProducts(data) {
    setProducts(() => [...data])
    //    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(data))
  }

  // Keep now maybe delete this method later if no usecase 
  function getProductById(id) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == id) {
        return products[i]
      }
    }
  }

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

  async function getProductBySlug(slug) {

    let data;
    for (let i = 0; i < products.length; i++) {
      if (products[i].slug == slug) {
        data = products[i]
        return data 
      }
    }

    const id = slug.split("-")[4]
    
    if(data == undefined){
      const response = await fetch(`https://dummyjson.com/products/${id}`)
      data = await response.json()
      return data
    }

  }

  return (
    <context.Provider
      value={{
        products,
        addProducts,
        getProductById,
        getProductBySlug,
        loading,
        getProducts
      }}
    >
      {children}
    </context.Provider>
  )
}
