import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProducts } from '../context/Product.jsx'

export default function SingleProduct() {
  const { slug } = useParams()
  const { getProductBySlug } = useProducts()
  const [product, setProduct] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setProduct(getProductBySlug(slug))
    setLoading(false)
  }, [])

  return <div className="container">{loading ? 'Loading...' : <h1>{product?.title}</h1>}</div>
}
