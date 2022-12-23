import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./app/app"
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import ProductContext from './app/context/Product'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ProductContext>
      <App />
      </ProductContext>
    </Router>
  </React.StrictMode>,
)

