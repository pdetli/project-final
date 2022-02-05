import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

import { shop } from '../reducers/shop'
import { showShop } from "../reducers/shop"

const Header = () => {

    const cart = useSelector((store) => store.cart.cart)

    const dispatch = useDispatch()

    const clearSearch = () => {
        dispatch(shop.actions.setSearch(""))
        dispatch(shop.actions.setGenre("ALL VINYLS"))
        dispatch(showShop())
    }

    return (
        <header className="row">
            <div>
                <Link to="/" className="brand" onClick={() => clearSearch()}>The Vinyl Shop</Link>
            </div>
            <SearchBar/> 
            <div>
                <span className="in-cart"> {cart.length} </span>
                <Link to="/Cart">
                 <span >
                   <i className={"fa fa-shopping-cart fa-lg"} />
                 </span>
                </Link>
                <Link to="/Contact">Contact</Link>
            </div>
        </header>    
    )
}

export default Header  






