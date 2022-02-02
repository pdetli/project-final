import React from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { cart } from '../reducers/cart'

const CartScreen = () => {
    const dispatch = useDispatch()
    const inCart = useSelector((store) => store.cart.cart)

    const decrease = (product) => {
        dispatch(cart.actions.decrease({...product}))
    }
    const increase = (product) => {
        dispatch(cart.actions.increase({...product}))
    }
    const removeFromCart = (product) => {
        dispatch(cart.actions.removeItem({product}))
    }
    const removeAllFromCart = () => {
        dispatch(cart.actions.removeAllItems({}))
    }

    if (inCart.length === 0) {
        return <p>Empty Cart, add items to cart!</p>
    }
    return (
        <main>
            <Link to="/" className="link-button">Back</Link>
            <Link to="/checkout" className="link-button">Checkout</Link>
            {inCart.map(product => (
                <div key={product._id}>
                <h1>Added to cart</h1>
                <img className="small" src={product.image} alt={product.name} />
                <p>Artist: {product.name}</p>
                <p>Title: {product.title}</p>
                <p>Quantity: {product.quantity}</p>
                <button onClick={() => decrease(product)}>-</button>
                <button onClick={() => increase(product)}>+</button>
                <p>Total price: {(product.quantity * product.price)}</p>
                <button onClick={() => removeFromCart(product)}>Remove</button>
            </div>
            ))}
            <button onClick={() => removeAllFromCart()}>Remove all</button>
        </main>    
    )
}

export default CartScreen  