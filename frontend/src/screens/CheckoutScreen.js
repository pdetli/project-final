import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const CheckoutScreen = () => {
  const inCart = useSelector((store) => store.cart.cart)

  const sumAllPrice = inCart
    .map((item) => item.quantity * item.price)
    .reduce((prev, curr) => prev + curr, 0)

  return (
    <section>
      <div className="screen-nav">
        <Link to="/Cart" className="link-button">
          Back to Cart
        </Link>
      </div>

      <form className="payment-form">
        <div className="input-fields">
          <h1 className="title-text">
            Payment Details <i class="fa-solid fa-credit-card fa-lg"></i>
          </h1>

          <p className="payment-details">
            Complete your purchase by providing your shipment details.
          </p>
          <div className="input-fields">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              id="email"
              name="email"
              placeholder="Email"
            />
            <label htmlFor="email">Card details</label>
            <div>
              <input
                type="number"
                required
                id="card"
                name="card"
                placeholder="Card number                                                 MM/YY CVC"
              />
            </div>
            <label htmlFor="name">Cardholder name</label>
            <input
              type="text"
              required
              id="name"
              name="name"
              placeholder="Name Surname"
            />
          </div>
        </div>

        <div className="input-div">
          <h1 className="title-text">
            Shipping address <i class="fa-solid fa-truck-fast fa-lg"></i>
          </h1>
          <form className="checkout-form">
            <div className="input-fields">
              <label htmlFor="name">Address</label>
              <input
                type="text"
                required
                id="address"
                name="address"
                placeholder="Adress"
              />

              <label htmlFor="name">Postcode</label>
              <input
                type="text"
                required
                id="postcode"
                name="postcode"
                placeholder="Postcode"
              />
            </div>
            
            <h4>Total <span>{sumAllPrice} SEK </span></h4>
            <Link to="/pay" type="submit">
              <button className="pay-btn"> PAY {sumAllPrice} SEK </button>
            </Link>
          </form>
        </div>
      </form>
    </section>
  )
}
export default CheckoutScreen
