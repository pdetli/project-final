import { createSlice } from '@reduxjs/toolkit'

//The Cart --- WORK IN PROGRESS
export const cart = createSlice({
	name: 'cart',
	initialState: {
	cart: [],
	},
	reducers: {
		setCart: (store, action) => {
			store.cart = action.payload
		},
	},
});
