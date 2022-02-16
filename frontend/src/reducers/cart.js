import { createSlice } from "@reduxjs/toolkit"

//The Cart
export const cart = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    modal: false,
  },
  reducers: {
    addItem: (store, action) => {
      const nrToAdd = action.payload.quantity
      const product = action.payload
      const productExist = store.cart.find((item) => item._id === product._id)

      if (productExist) {
        console.log(productExist)
        productExist.quantity =
          parseInt(productExist.quantity) + parseInt(nrToAdd)
      } else {
        store.cart.push({ ...product })
      }
    },
    increase: (store, action) => {
      const productExist = store.cart.find(
        (item) => item._id === action.payload._id
      )
      if (productExist.quantity >= productExist.nrStock) {
        store.modal = true
      } else {
        productExist.quantity++
      }
    },
    decrease: (store, action) => {
      const productExist = store.cart.find(
        (item) => item._id === action.payload._id
      )
      if (productExist.quantity === 1) {
        store.cart = store.cart.filter(
          (item) => item._id !== action.payload._id
        )
      } else {
        productExist.quantity--
      }
    },
    removeItem: (store, action) => {
      store.cart = store.cart.filter(
        (item) => item._id !== action.payload.product._id
      )
    },
    removeAllItems: (store, action) => {
      store.cart = []
    },
    setModalOn: (store, action) => {
			store.modal = action.payload
		},
  },
})
