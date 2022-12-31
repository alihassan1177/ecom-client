import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProducts } from '../context/Product.jsx'
import {motion} from "framer-motion"

export default function SingleProduct() {
  const { slug } = useParams()
  const { getProductBySlug } = useProducts()
  const [product, setProduct] = useState()
  const [loading, setLoading] = useState(true)

  async function getProduct() {
    const productData = await getProductBySlug(slug)
    setProduct(productData)
    setLoading(false)
  }

  useEffect(() => {
    getProduct()
  }, [])

  return <motion.div 
   initial={{opacity : 0}}
      animate={{opacity : 1}}
      transition={{delay : 0.1}}
      exit={{opacity : 0}}
    className="container">{loading ? 'Loading...' : <h1>{product?.title}</h1>}</motion.div>
}
