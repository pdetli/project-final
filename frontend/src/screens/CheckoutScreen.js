import React from 'react' 
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const CheckoutScreen = () => {
    const inCart = useSelector((store) => store.cart.cart)

    const sumAllPrice = inCart.map(item => item.quantity * item.price).reduce((prev, curr) => prev + curr, 0)

    return (
        <main>
          <Link to="/cart" className="link-button">
            Back to Cart
          </Link>
    
          <section className="checkout-section">
            <div className="input-div">
              <h1 className="checkout-title">Payment Details</h1>
              <p className="payment-details">
                Complete your purchase by providing your shipment details.
              </p>
              <div className="input-fields">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  required
                  id="email"
                  name="email"
                  placeholder="Write your E-mail..."
                  
                />
                <label htmlFor="email">Card details</label>
                <div>
                <input
                  type="number"
                  required
                  id="card"
                  name="card"
                  placeholder="Card number                                            MM/YY CVC"
                />
                </div> 
                <label htmlFor="name">Cardholder name</label>
                <input
                  type="text"
                  required
                  id="name"
                  name="name"
                  placeholder="Write your name..."              
                />        
              </div>
            </div>
    
            <div className="input-div">
              <h1 className="checkout-title">Shipping address</h1>
              <form className="checkout-form">
                <div className="input-fields">
                  <label htmlFor="name">Address</label>
                  <input
                    type="text"
                    required
                    id="address"
                    name="address"
                    placeholder="Write your address..."
                  />
    
                  <label htmlFor="name">Postcode</label>
                  <input
                    type="text"
                    required
                    id="postcode"
                    name="postcode"
                    placeholder="Write your postcode..."
                  />
                </div>
                <div className=" checkout-title">
                  <h4 className="newsletter">Newsletter</h4>
                  <div>
                    <input
                      type="radio"
                      id="letter-yes"
                      name="newsletter"
                      value="yes"
                    />
                    <label htmlFor="newsletter">Yes</label>
                    <input
                      type="radio"
                      id="letter-no"
                      name="newsletter"
                      value="no"
                    />
                    <label htmlFor="newsletter">No</label>
                  </div>
                </div>
                <h4> Total {sumAllPrice} SEK</h4>
                <Link to="/pay" type="submit">
                  <button className="pay-button"> PAY {sumAllPrice} SEK </button>
                </Link>
              </form>
            </div>
          </section>
        </main>
      )
    }
export default CheckoutScreen  