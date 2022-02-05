import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { shop } from '../reducers/shop'

const SearchBar = () => {
  const [search, setSearch] = useState("")
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSearchHandle = () => {
    fetch(`http://localhost:3003/api/products/name?name=${search}`)
      .then((response) => response.json())
      .then((data) => {
        if (search.length > 0){
          dispatch(shop.actions.setItems(data))
          dispatch(shop.actions.setSearch(search))
          navigate("/")
        }
      })
  }

  return (
    <>
      <div>
          <label htmlFor="searchByArtist">
            <input
              id="searchByArtist"
              type="text"
              placeholder="Search by artist"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <button onClick={() => onSearchHandle()}>SEARCH</button>
      </div>
    </>
  )
}

export default SearchBar
