import React, { useEffect, useState } from "react"
import Product from "../components/Product"
//import Loading from "../components/Loading"

import { showShop } from "../reducers/shop"
import { useSelector, useDispatch } from "react-redux"

const HomeScreen = () => {
  const dispatch = useDispatch()
  const products = useSelector((store) => store.shop.items)
  // const loading = useSelector((store) => store.shop.loading)
  const [selectedGenre, setSelectedGenre] = useState([])

  useEffect(() => {
    dispatch(showShop())
  }, [dispatch])

  const handleInput = (props) => {
    fetch(`http://localhost:3003/api/products/${props}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("selected genre", data)
        setSelectedGenre(data)
      })
  }

  return (
    <main>
      <div className="genre-container">
        <button type="image" onClick={() => handleInput("")}>
          <img src="/assets/all.png" height="100" width="100" />
          <p> GET'EM ALL</p>
        </button>
        <button type="image" onClick={() => handleInput("genre/?genre=pop")}>
          <img src="/assets/pop.png" height="100" width="100" />
          <p> POP</p>
        </button>
        <button type="button" onClick={() => handleInput("genre/?genre=hip")}>
          <img src="/assets/hiphop.png" height="100" width="100" />
          <p> HIP HOP</p>
        </button>
        <button type="button" onClick={() => handleInput("genre/?genre=rock")}>
          <img src="/assets/rock.png" height="100" width="100" />
          <p> ROCK</p>
        </button>
        <button
          type="button"
          onClick={() => handleInput("genre/?genre=electronic")}
        >
          <img src="/assets/electronic.png" height="100" width="100" />
          <p> ELECTRONIC</p>
        </button>
      </div>

      {selectedGenre.length === 0 && (
        <section className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </section>
      )}
      {selectedGenre.length !== 0 && (
        <section className="row center">
          {selectedGenre.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </section>
      )}
    </main>
  )
}

export default HomeScreen
