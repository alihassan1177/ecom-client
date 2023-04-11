import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Breadcrumbs from '../components/Breadcrumbs'
import { useShoppingCart } from '../context/Cart'
import { ProductCardRow } from '../components/ProductCard'
import { useUser } from '../context/User'
import { Modal } from "react-bootstrap"
import GoogleIcon from '/images/google.png'


export default function Checkout() {

    const { cart, checkout } = useShoppingCart()
    const [authModal, setAuthModal] = useState(false)
    const { isAuthenticated, handleAuth, user } = useUser()

    const authButton = useRef()
    const checkoutButton = useRef()

    async function handleGoogleAuth() {
        const span = authButton.current.children[1]
        span.innerText = 'Processing...'
        authButton.current.classList.add('disabled')
        const status = await handleAuth()
        authButton.current.classList.remove('disabled')
        console.log(status)
        if (status.status == true) {
            setAuthModal(false)
        } else {
            span.innerText = 'Continue with Google'
        }
    }

    async function handleCheckout() {
        checkoutButton.current.classList.add("disabled")
        checkoutButton.current.innerText = "Processing..."
        const result = await checkout(user)
        if (result == true) {
            checkoutButton.current.innerText = "Checkout"
            checkoutButton.current.classList.remove("disabled")
        }
    }


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 30 }}
            className="container-fluid h-screen"
        >
            <Modal centered show={authModal} onHide={() => setAuthModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>User Login</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ paddingBlock: '24px' }}>
                    <p className="text-center px-3">
                        Connect your Google Account to keep track of your orders and payments
                    </p>
                    <button
                        ref={authButton}
                        onClick={async () => await handleGoogleAuth()}
                        style={{ width: '100%' }}
                        className="btn btn-md btn-light border"
                    >
                        <img style={{ width: '36px' }} className="me-2" alt="Google" src={GoogleIcon} />
                        <span>Continue with Google</span>
                    </button>
                </Modal.Body>
            </Modal>
            <Breadcrumbs />
            <h1 className='mb-3'>Checkout</h1>
            {cart.length > 0 ? (
                cart.map((product, index) => {
                    return (
                        <ProductCardRow
                            key={index}
                            name={product.name}
                            company={product.company}
                            image={product.image}
                            id={product.id}
                            price={product.price}
                        />
                    )
                })
            ) : (
                <p className="lead text-danger">No Products in Cart</p>
            )}
            {cart.length > 0 ? (
                <button
                    ref={checkoutButton}
                    onClick={() => {
                        if (isAuthenticated == true) {
                            handleCheckout()
                        } else {
                            setAuthModal(true)
                        }
                    }}
                    className="btn btn-dark mt-3"
                >
                    Checkout
                </button>

            ) : (
                ''
            )}

        </motion.div>
    )
}
