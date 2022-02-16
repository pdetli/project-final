import { createSlice } from '@reduxjs/toolkit'
import { BASE_URL } from "../utils/urls"

//The product store
export const shop = createSlice({
	name: 'shop',
	initialState: {
		items: [],
		item: [],
		search: "",
		genre: "",
		loading: false,
	},
	reducers: {
		setItems: (store, action) => {
			store.items = action.payload
		},
		setItem: (store, action) => {
			store.item = action.payload
		},
		setLoading: (store, action) => {
			store.loading = action.payload
		},
		setSearch: (store, action) => {
			store.search = action.payload
		},
		setGenre: (store, action) => {
			store.genre = action.payload
		},
		setError: (store, action) => {
			store.error = action.payload
		},
	},
});

// Full products
export const showShop = () => {
	return (dispatch) => {		
		const options = {
			method: "GET",
			headers: {
                'Content-Type': 'application/json',
            },
		};
		dispatch(shop.actions.setLoading(true))
		fetch(`${BASE_URL}api/products`, options)		
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					dispatch(shop.actions.setItems(data))
					dispatch(shop.actions.setError(null))
					dispatch(shop.actions.setLoading(false))
				} else {
					dispatch(shop.actions.setError(data))
					dispatch(shop.actions.setLoading(false))
				}
			})			
	}
}

//Single product
export const showProduct = (id) => {
	return (dispatch) => {		
		const options = {
			method: "GET",
			headers: {
                'Content-Type': 'application/json',
            },
		};
		dispatch(shop.actions.setLoading(true))
		fetch(`${BASE_URL}api/products/id/${id}`, options)
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					dispatch(shop.actions.setItem(data))
					dispatch(shop.actions.setError(null))
					dispatch(shop.actions.setLoading(false))
				} else {
					dispatch(shop.actions.setError(data))
					dispatch(shop.actions.setLoading(false))
				}
			})		
	}
}

