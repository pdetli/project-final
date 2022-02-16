import { Link } from 'react-router-dom'

import React from 'react'
import Rating from './Rating'

const Product = (props) => {
  const {product} = props
    return (
      <div key={product._id} className="card">
        <Link to={`/product/${product._id}`}>
          <img className="medium" src={product.image} alt={product.name} />
        </Link>
        <div className="card-body">
          <Link to={`/product/${product._id}`}>
            <h2 className="style-text">{product.name}</h2>
            <p className="card-text">{product.title}</p>
          </Link>
          <Rating rating={product.rating} />
          {product.nrStock > 0 ? (
            <span className="success">In Stock</span>
            ) : ( 
            <span className="error">Not In Stock</span>
            )}
          <div className="price">{product.price} SEK</div>
        </div>
      </div>
    )
}

export default Product