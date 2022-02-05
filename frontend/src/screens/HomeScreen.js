import React, { useEffect, useState } from "react"
import Product from "../components/Product"
//import Loading from '../components/Loading'

import { shop } from "../reducers/shop"
import { showShop } from "../reducers/shop"
import { useSelector, useDispatch } from "react-redux"

const HomeScreen = () => {
  const dispatch = useDispatch()
  const products = useSelector((store) => store.shop.items)
  const search = useSelector((store) => store.shop.search)
  const genre = useSelector((store) => store.shop.genre)
  //const loading = useSelector((store) => store.shop.loading)

  let [selectedGenre, setSelectedGenre] = useState([])

  useEffect(() => {
    if (search === "" && selectedGenre < 1) {
      dispatch(shop.actions.setGenre("ALL VINYLS"))
      dispatch(showShop())
    }
  }, [dispatch, search, selectedGenre])

  const handleInput = (props) => {
    fetch(`http://localhost:3003/api/products/${props}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(shop.actions.setItems(data))
        dispatch(shop.actions.setSearch(""))
        setSelectedGenre(1)
        if (props === "genre/?genre=pop") {
          dispatch(shop.actions.setGenre("POP"))
        } else if (props === "genre/?genre=hip") {
          dispatch(shop.actions.setGenre("HIP HOP"))
        } else if (props === "genre/?genre=rock") {
          dispatch(shop.actions.setGenre("ROCK"))
        } else if (props === "genre/?genre=electronic") {
          dispatch(shop.actions.setGenre("ELECTRONIC"))
        } else if (props === "") {
          dispatch(shop.actions.setGenre("ALL VINYLS"))
        }
      })
  }

  return (
    <main>
      <div className="genre-container">
        <button type="image" onClick={() => handleInput("")}>
          <img
            src="/assets/all.png"
            height="100"
            width="100"
            alt="vinyl cover"
          />
          <p> GET'EM ALL</p>
        </button>
        <button type="image" onClick={() => handleInput("genre/?genre=pop")}>
          <img
            src="/assets/pop.png"
            height="100"
            width="100"
            alt="vinyl cover"
          />
          <p> POP</p>
        </button>
        <button type="button" onClick={() => handleInput("genre/?genre=hip")}>
          <img
            src="/assets/hiphop.png"
            height="100"
            width="100"
            alt="vinyl cover"
          />
          <p> HIP HOP</p>
        </button>
        <button type="button" onClick={() => handleInput("genre/?genre=rock")}>
          <img
            src="/assets/rock.png"
            height="100"
            width="100"
            alt="vinyl cover"
          />
          <p> ROCK</p>
        </button>
        <button
          type="button"
          onClick={() => handleInput("genre/?genre=electronic")}
        >
          <img
            src="/assets/electronic.png"
            height="100"
            width="100"
            alt="vinyl cover"
          />
          <p> ELECTRONIC</p>
        </button>
      </div>

      {search === "" && (
        <div className="genre-header">
          <h1>{genre}</h1>
        </div>
      )}
      {search.length > 0 && (
        <div className="genre-header">
          <h1>SEARCH: {search}</h1>
        </div>
      )}

      <section className="row center">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </section>
    </main>
  )
}

export default HomeScreen
