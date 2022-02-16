import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userId: null,
  email: null,
  accessToken: null,
  error: null,
}

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload
    },
    setEmail: (store, action) => {
      store.email = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
    logout: () => {
      return initialState
    },
  },
})
