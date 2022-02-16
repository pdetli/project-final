import React, { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addVinyl } from "../reducers/addVinyl"
import { BASE_URL } from "../utils/urls"
import { Link } from "react-router-dom" 
import Logout from "../components/Logout" 

const UploadScreen = () => {
  const fileInput = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [genre, setGenre] = useState("")
  const [price, setPrice] = useState("")
  const [released, setReleased] = useState("")
  const [nrStock, setNrStock] = useState("")
  const [brand, setBrand] = useState("")
  const [rating, setRating] = useState("")


  const changeHandler = (e) => {
    e.preventDefault()
  }

  const nameHandler = (e) => {
    setName(e.target.value)
    e.preventDefault()
  }
  const titleHandler = (e) => {
    setTitle(e.target.value)
    e.preventDefault()
  }
  const genreHandler = (e) => {
    setGenre(e.target.value)
    e.preventDefault()
  }

  const priceHandler = (e) => {
    setPrice(e.target.value)
    e.preventDefault()
  }
  const releasedHandler = (e) => {
    setReleased(e.target.value)
    e.preventDefault()
  }
  const stockHandler = (e) => {
    setNrStock(e.target.value)
    e.preventDefault()
  }
  const brandHandler = (e) => {
    setBrand(e.target.value)
    e.preventDefault()
  }

  const ratingHandler = (e) => {
    setRating(e.target.value)
    e.preventDefault()
  }
  const handleSubmission = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", fileInput.current.files[0])
    formData.append("name", name)
    formData.append("title", title)
    formData.append("genre", genre)
    formData.append("price", price)
    formData.append("released", released)
    formData.append("nrStock", nrStock)
    formData.append("brand", brand)
    formData.append("rating", rating)


    fetch(`${BASE_URL}api/products`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        console.log(data.name)
        dispatch(addVinyl.actions.setImage(data.image))
        dispatch(addVinyl.actions.setName(data.name))
        dispatch(addVinyl.actions.setTitle(data.title))
        dispatch(addVinyl.actions.setPrice(data.price))
        dispatch(addVinyl.actions.setPrice(data.genre))
        dispatch(addVinyl.actions.setPrice(data.nrStock))
        dispatch(addVinyl.actions.setPrice(data.released))
        navigate(`/product/${data._id}`) 

      })
  }

  return (
    <>
      <div className="container">
        <div className="screen-nav">
          <Link to="/" className="link-button">
            Back to Store
          </Link>
          <Logout />
        </div>

        <div className="form-wrapper">
          <form
            className="upload-form"
            method="POST"
            onSubmit={handleSubmission}
          >
            <p className="title-text">
              Sell your vinyls! <i class="fa-solid fa-compact-disc fa-lg "></i>
            </p>
            <div className="input-field">
              <div className="input-labels">
                <label htmlFor="name">Artist Name</label>
                <input type="text" name="name" onChange={nameHandler} />

                <label htmlFor="title">Album Title</label>
                <input type="text" name="genre" onChange={titleHandler} />


                <label htmlFor="genre">Genre</label>
                <select type="text" value={genre} onChange={genreHandler}>
                  <option value="">-</option>
                  <option value="rock">Rock</option>
                  <option value="pop">Pop</option>
                  <option value="hiphop">Hip Hop</option>
                  <option value="electronic">Electronic</option>
                </select>

                <label htmlFor="released">Release date</label>
                <input type="text" name="released" onChange={releasedHandler} />

                <label htmlFor="brand">Label</label>
                <input type="text" name="label" onChange={brandHandler} />

                <label htmlFor="price">Price</label>
                <input type="number" name="price" onChange={priceHandler} />

                <label htmlFor="nrStock">Number of stock </label>
                <input type="number" name="nrStock" onChange={stockHandler} />

                <label htmlFor="rating">Rating</label>
                <select type="number" value={rating} onChange={ratingHandler}>
                  <option value="">-</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>

                <label htmlFor="file-name">
                  JPG, JPEG or PNG file size no more then 10MB
                </label>
                <input
                  className="btn-select"
                  type="file"
                  ref={fileInput}
                  name="file-name"
                  accept=".xml,.pdf,.jpeg,.png,"
                  onChange={changeHandler}
                />

                <button className="upload-btn">UPLOAD VINYL</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default UploadScreen
