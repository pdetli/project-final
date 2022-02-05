import React from 'react' 
//import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const PayScreen = () => {
    //const inCart = useSelector((store) => store.cart.cart)
    //const sumAllPrice = inCart.map(item => item.quantity * item.price).reduce((prev, curr) => prev + curr, 0)
    
    return (
        <main>
            <Link to="/checkout" className="link-button">Back to Checkout</Link>
            <div className="row center">
                <h1>Thanks you for shopping at the Vinyl Shop!</h1>
            </div>
        </main>    
    )
}

export default PayScreen  