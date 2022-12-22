import Header from "./components/Header";
import ProductCard from "./components/ProductCard.jsx"
import { useState, useEffect } from "react"
import CartContext from "./context/Cart";

export default function App() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  async function getProducts() {
    const response = await fetch("/data.json")
    const data = await response.json()
    setProducts(data)
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
            {loading ? "Loading" :
              products.map((product, index) => {
                return <ProductCard
                  name={product.name}
                  id={product.id}
                  company={product.company}
                  key={index}
                  image={product.image}
                  price={product.price}
                />
              })
            }
          </div>
        </div>
      </CartContext>
    </>
  )

}
