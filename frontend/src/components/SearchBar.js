import React, { useState } from "react"

const SearchBar = () => {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState("")

  const onSearchHandle = (search) => {
    console.log(search)
    fetch(`http://localhost:3003/api/products/name?name=${search}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResult(data)
        console.log(searchResult)
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
          <button onClick={() => onSearchHandle(search)}>SEARCH</button>
  

      </div>
    </>
  )
}

export default SearchBar
