import React from 'react' 
import { Link } from 'react-router-dom'

const PayScreen = () => {

    return (
        <main>
            <div className="screen-nav">
                <Link to="/checkout" className="link-button">Back to Checkout</Link>
            </div>
            <div className="row center">
                <div className="center-mid">
                    <h1 className="style-text">Thanks you for shopping at Vinyl Cakes!</h1>
                    <img src="/assets/cat-gato.gif" alt="Turntable Cat" /> 
                </div>
            </div>
        </main>    
    )
}

export default PayScreen  