import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { showProduct } from "../reducers/shop"
import { cart } from '../reducers/cart'

import Rating from '../components/Rating'
import Loading from '../components/Loading'
import Modal from '../components/Modal'

const ProductScreen = () => {
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1)
    const [quantityCart, setQuantityCart] = useState("")
    const product = useSelector((store) => store.shop.item)
    const inCart = useSelector((store) => store.cart.cart)
    const loading = useSelector((store) => store.shop.loading)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(showProduct(id))
    }, [dispatch, id])
    
    if (product.error || product.length === 0) {
        return (
            <main className="row center">
                <div className="center-mid">
                    <h1 className="style-text">Product Not Found!</h1>
                    <img className="medium circle" src="/assets/BlackEmptyCrate.jpeg" alt="Empty Crate" />
                </div>
            </main>   
        )
    }

    const addToCart = () => {  
        const productExist = inCart.find((item) => item._id === product.response._id)
        
        if (productExist){
            const sumQuantity = parseInt(quantity)+parseInt(productExist.quantity)
                    
            if (sumQuantity > productExist.nrStock){  
                setQuantityCart(`${productExist.quantity}/${productExist.nrStock}`)
                dispatch(cart.actions.setModalOn(true))
            } else {
                dispatch(cart.actions.addItem({...product.response, quantity}))
                navigate('/cart')
            } 
        } else {
            dispatch(cart.actions.addItem({...product.response, quantity}))
            navigate('/cart')
        }
    }

     return (
        <main>     
            {loading ? (
                <Loading /> 
            ) : (
                <>
                <Modal title="Sorry!" text={"You already have " + quantityCart + " in your cart."}/>
                <div className="screen-nav">
                    <Link to="/" className="link-button">Back</Link>
                </div>
                <div className="row top"> 
                    <div className="column-2">  
                        <img className="large" src={product.response.image} alt={product.response.name} /> 
                    </div>
                    <div className="artist-card-info">
                            <ul>
                                <li>
                                    <h1 className="style-text">{product.response.name}</h1>
                                    <h2>{product.response.title}</h2>
                                    <p>Label: {product.response.brand}</p>
                                </li>
                                <li>
                                    <Rating rating={product.response.rating} nrRating={product.response.nrRating} />
                                </li>
                            </ul>
                    </div>
                    <div className="column-1">
                        <div className="product-card-info">
                            <ul>
                                <li>
                                    <div className="row">
                                        <div>Price</div>
                                        <div className="price">{product.response.price} SEK</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Status</div>
                                        {product.response.nrStock > 0 ? (
                                            <span className="success">{product.response.nrStock} x In Stock</span>
                                        ) : ( 
                                            <span className="error">Not In Stock</span>
                                        )}
                                    </div>
                                </li>
                                {product.response.nrStock > 0 &&(
                                    <>
                                        <li>
                                            <div className="row">
                                                <div>Quantity</div>
                                                <div>
                                                    <select 
                                                        value={quantity} 
                                                        onChange={(event) => setQuantity(event.target.value)} 
                                                    >
                                                    {[...Array(product.response.nrStock).keys()].map(
                                                        (x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        )
                                                    )}
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <button onClick={() => addToCart()}>Add</button>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                </>
            )} 
        </main> 
    )
}

export default ProductScreen    