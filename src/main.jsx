import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/app'
import { BrowserRouter as Router } from 'react-router-dom'
import ProductContext from './app/context/Product'
import UserContext from './app/context/User.jsx'
import "./index.scss"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ProductContext>
        <UserContext>
          <App />
        </UserContext>
      </ProductContext>
    </Router>
  </React.StrictMode>
)
