import React, { useState, useEffect, useRef } from "react"
// import { API_URL } from "utils/urls"
//import Loading from '../components/Loading'
import { useSelector, useDispatch } from "react-redux"
import { addVinyl } from "../reducers/addVinyl"

const UploadScreen = () => {
  const fileInput = useRef()
  const dispatch = useDispatch()
  // const name = useSelector((store) => store.shop.name)
  //const title = useSelector((store) => store.shop.title)
  // const genre = useSelector((store) => store.shop.genre)

  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [selectedFile, setSelectedFile] = useState("")
  const [isFilePicked, setIsFilePicked] = useState(false)

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0])
    setIsFilePicked(true)
    e.preventDefault()
  }

  const nameHandler = (e) => {
    setName({ name: e.target.value })
    // setTitle({ title: e.target.value })
    // setPrice({ price: e.target.value })
    e.preventDefault()
  }

  const handleSubmission = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", fileInput.current.files[0])
    formData.append("name", name.text)
    formData.append("title", name.title)
    //  formData.append("price", price.text)
    // formData.append("nrStock", nrStock.text)
    // formData.append("brand", brand.text)
    // formData.append("rating", rating.text)
    // formData.append("nrRating", nrRating.text)
    // formData.append("released", released.text)
    //  formData.append("about", about.text)

    fetch("http://localhost:3003/api/products", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        //dispatch(addVinyl.actions.setImage(data.image))
        dispatch(addVinyl.actions.setName(name))
        // dispatch(addVinyl.actions.setName(data))
        //  dispatch(addVinyl.actions.setPrice(data))
        console.log("second console")
      })
  }

  return (
    <>
      <div className="container">
        <p className="title-text">Upload new vinlys to the shop</p>
        <div className="form-wrapper">
          <form method="POST" onSubmit={handleSubmission}>
            <div className="input-field">
              <div className="input-labels">
                {/* <label htmlFor="price">price</label>
                <input type="text" name="price" onChange={nameHandler} /> */}

                <label htmlFor="name">Artist Name</label>
                <input type="text" name="name" onChange={nameHandler} />
                <label htmlFor="title">Album Title</label>
                <input type="text" name="title" onChange={nameHandler} />
                <div>
                  <div className="">
                    <label htmlFor="file-name">
                      JPG or PDF file size no more then 10MB
                    </label>
                    <input
                      className="btn-select"
                      type="file"
                      ref={fileInput}
                      name="file-name"
                      accept=".xml,.pdf,.jpeg,.png,"
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="btn-upload-row">
                    <button className="btn-upload">UPLOAD FILE</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default UploadScreen
