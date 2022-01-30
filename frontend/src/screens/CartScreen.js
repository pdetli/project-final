import React, { useEffect } from 'react' 
import { useParams, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { cart } from '../reducers/cart'

const CartScreen = () => {
    const { id } = useParams()
    const location = useLocation()
    const quantity = location.search
        ? Number(location.search.split('=')[1])
        : 1
        console.log(quantity)

    const dispatch = useDispatch()
    
        useEffect(()=> {
            
                dispatch(cart.actions.setCart({id, quantity}))
            
        },[dispatch, id, quantity])

    return (
        <main className="row center">
            <h1>Cart</h1>
            <p>Add to cart</p>
            <p>Product: {id}</p>
            <p>Quantity: {quantity}</p>
        </main>    
    )
}

export default CartScreen  