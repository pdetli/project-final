import React, { useEffect, useState } from "react"
import Product from "../components/Product"
import Loading from "../components/Loading"
import SearchBar from "../components/SearchBar"
//import { Carousel } from "react-responsive-carousel"
//import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader

import { useSelector, useDispatch } from "react-redux"

import { BASE_URL } from "../utils/urls"
import { shop } from "../reducers/shop"
import { showShop } from "../reducers/shop"

const HomeScreen = () => {
  const dispatch = useDispatch()
  const products = useSelector((store) => store.shop.items)
  const search = useSelector((store) => store.shop.search)
  const genre = useSelector((store) => store.shop.genre)
  const loading = useSelector((store) => store.shop.loading)
  const [selectedGenre, setSelectedGenre] = useState(false)

  useEffect(() => {
    if (search === "" && selectedGenre === false) {
      dispatch(shop.actions.setGenre("ALL VINYLS"))
      dispatch(showShop())
    }
  }, [dispatch, search, selectedGenre])

  const handleInput = (props) => {
    dispatch(shop.actions.setLoading(true))
    fetch(`${BASE_URL}api/products/${props}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedGenre(true)
        dispatch(shop.actions.setSearch(""))
        dispatch(shop.actions.setItems(data))
        dispatch(shop.actions.setLoading(false))
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
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="genre-container">
            <div className="genre-block">
              <div className="genre-button" onClick={() => handleInput("")}>
                <p> GET'EM ALL</p>
              </div>
              <div
                className="genre-button"
                onClick={() => handleInput("genre/?genre=pop")}
              >
                <p> POP</p>
              </div>
              <div
                className="genre-button"
                onClick={() => handleInput("genre/?genre=hip")}
              >
                <p> HIP HOP</p>
              </div>
              <div
                className="genre-button"
                onClick={() => handleInput("genre/?genre=rock")}
              >
                <p> ROCK</p>
              </div>
              <div
                className="genre-button"
                onClick={() => handleInput("genre/?genre=electronic")}
              >
                <p> ELECTRONIC</p>
              </div>
            </div>
            <SearchBar />
          </div>

          {search === "" && (
            <div className="genre-header">
              <h1>{genre}</h1>
            </div>
          )}

          {search.length > 0 && (
            <div className="genre-header">
              <h1>Searched for: {search}</h1>
            </div>
          )}

          <section className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </section>

          <div className="genre-header">
            <h1>FEATURED COLLECTION</h1>
          </div>

          <section className="row center best">
            {products
              .filter((product) => product.rating >= 1.1 && 2 >= product.rating)
              .map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </section>
        </>
      )}
    </main>
  )
}

export default HomeScreen
