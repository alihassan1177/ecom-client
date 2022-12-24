import React from 'react'
import { useParams } from 'react-router-dom'
import {useProducts} from "../context/Product.jsx"

export default function SingleProduct() {
  const {id} = useParams()
  const {getProductById} = useProducts()

  const product = getProductById(id)

  console.log(product)
  return <h1>{product.title}</h1>
}
