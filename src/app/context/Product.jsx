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

  function addProducts(data) {
    setProducts(() => [...data])
    //    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(data))
  }

  // Refractor this and the getProductBySlug Method
  function getProductById(id) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == id) {
        return products[i]
      }
    }
  }

  function getProductBySlug(slug) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].slug == slug) {
        return products[i]
      }
    }
  }

  return (
    <context.Provider
      value={{
        products,
        addProducts,
        getProductById,
        getProductBySlug
      }}
    >
      {children}
    </context.Provider>
  )
}
