import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProducts } from '../context/Product.jsx'
import { motion } from 'framer-motion'
import { useShoppingCart } from '../context/Cart.jsx'
import {ProductsComponent} from "../app.jsx"
import Breadcrumbs from '../components/Breadcrumbs.jsx'

export default function SingleProduct() {
  const { slug } = useParams()
  const { getProductBySlug, getProductsByCategory} = useProducts()
  const [product, setProduct] = useState()
  const [loader, setLoading] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState([])
  const { addItemInCart } = useShoppingCart()

  const data = {
    name: product?.title,
    company: product?.category,
    image: product?.thumbnail,
    id: product?.id,
    price: product?.price,
    quantity: 1
  }

  async function getProduct() {
    const productData = await getProductBySlug(slug)
    setProduct(productData)
    const relatedData = await getProductsByCategory(productData.category)
    setRelatedProducts(relatedData)
    setLoading(false)
  }

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      exit={{ opacity: 0 }}
      className="container"
    >
      <Breadcrumbs />
      {loader ? (
        'Loading...'
      ) : (
        <div className="row row-cols-1 row-cols-md-2  g-4">
          <div className="col">
            <img
              style={{ width: '100%', objectFit: 'cover' }}
              src={product.thumbnail}
              className="border single-product-img"
              alt={product.title}
            />
          </div>
          <div className="col">
            <h1 style={{ textTransform: 'capitalize' }}>{product.title}</h1>
            <p>Description : {product.description}</p>
            <p style={{ textTransform: 'capitalize' }}>Category : {product.category}</p>
            <p>
              Price : <strong className="fs-3">${product.price}</strong>
            </p>
            <button onClick={() => addItemInCart(data)} className="btn btn-dark btn-md">
              Add to Cart
            </button>
          </div>
        </div>
      )}
      <h2 className='mt-5 mb-3'>Related Products</h2>
      {loader ? "Loading..." : <ProductsComponent  data={relatedProducts} isLoaded={loader} />}
    </motion.div>
  )
}
