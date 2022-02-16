import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { BASE_URL } from "../utils/urls"

import { shop } from '../reducers/shop'
import { showShop } from "../reducers/shop"
import { cart } from '../reducers/cart'

import Loading from '../components/Loading'
import Modal from '../components/Modal'

const SearchBar = () => {
  const loading = useSelector((store) => store.shop.loading)
  const [search, setSearch] = useState("")
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const checkKey = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      onSearchHandle(e)
    }
  }

  const onSearchHandle = () => {
    dispatch(shop.actions.setLoading(true))
    fetch(`${BASE_URL}api/products/search?q=${search}`)
      .then((response) => response.json())
      .then((data) => {
        if (search.length > 0 && data.success === !false){
          dispatch(shop.actions.setItems(data.response))
          dispatch(shop.actions.setSearch(search))
          dispatch(shop.actions.setLoading(false))
          navigate("/")
        } else if (!search) {
          dispatch(shop.actions.setLoading(false))
          dispatch(shop.actions.setGenre("ALL VINYLS"))
          dispatch(shop.actions.setSearch(""))
          dispatch(showShop())
          navigate("/")
        } else {
          dispatch(shop.actions.setLoading(false))
          dispatch(cart.actions.setModalOn(true))
          navigate("/")  
        }
      })
  }

  return (  
    <>
      {loading ? (
        <Loading />
        ) : (
        <>
         <Modal title="Sorry!" text="Could not find a match" />
          <div className="search-bar">
              <label htmlFor="searchByArtist">
                <input className="search-input"
                  id="searchByArtist"
                  type="text"
                  placeholder=""
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => checkKey(e)}
                />
              </label>
              <div className="search-button" onClick={() => onSearchHandle()}>SEARCH</div>
          </div>
        </>
      )}
    </>
  )
}

export default SearchBar


