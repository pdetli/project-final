import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'


const Header = () => {

    const cart = useSelector((store) => store.cart.cart)

    return (
        <header className="row">
            <div>
                <Link to="/" className="brand">The Vinyl Shop</Link>
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






