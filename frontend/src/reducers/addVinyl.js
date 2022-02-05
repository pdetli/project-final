import { createSlice } from "@reduxjs/toolkit"

//The vinyl upload
export const addVinyl = createSlice({
  name: "vinyl",
  initialState: {
    name: "",
    title: "",
    genre: "",
    image: "",
    price: "",
    nrStock: "",
    brand: "",
    nrRating: "",
    released: "",
    loading: false,
    error: null,
  },
  reducers: {
    setName: (store, action) => {
      store.name = action.payload
      console.log(action.payload, "name payload")
    },
    setTitle: (store, action) => {
      store.title = action.payload
    },
    setGenre: (store, action) => {
      store.genre = action.payload
    },
    setImage: (store, action) => {
      store.image = action.payload
    },
    setPrice: (store, action) => {
      store.price = action.payload
    },
    setNrStock: (store, action) => {
      store.nrStock = action.payload
    },
    setBrand: (store, action) => {
      store.brand = action.payload
    },
    setNrRating: (store, action) => {
      store.price = action.payload
    },
    setReleased: (store, action) => {
      store.price = action.payload
    },
    setLoading: (store, action) => {
      store.loading = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
  },
})

// export const showShop = () => {
//   return (dispatch) => {
//     const options = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//     dispatch(shop.actions.setLoading(true))
//     fetch("http://localhost:3003/api/products", options)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data) {
//           dispatch(shop.actions.setItems(data))
//           dispatch(shop.actions.setError(null))
//           dispatch(shop.actions.setLoading(false))
//         } else {
//           dispatch(shop.actions.setError(data))
//           dispatch(shop.actions.setLoading(false))
//         }
//       })
//   }
// }
