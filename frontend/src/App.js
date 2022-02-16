import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk";
import { combineReducers, createStore, compose, applyMiddleware } from "@reduxjs/toolkit"

import { shop } from "./reducers/shop"
import { cart } from "./reducers/cart"
import { user } from "./reducers/user"
import { addVinyl } from "./reducers/addVinyl"

import Header from "./components/Header"
import Footer from "./components/Footer"
import NotFound from "./components/NotFound"
import Signup from "./components/Signup" 

import ProductScreen from "./screens/ProductScreen"
import HomeScreen from "./screens/HomeScreen"
import CartScreen from "./screens/CartScreen"
import CheckoutScreen from "./screens/CheckoutScreen"
import PayScreen from "./screens/PayScreen"
import ContactScreen from "./screens/ContactScreen"
import UploadScreen from "./screens/UploadScreen"

const reducer = combineReducers({
  shop: shop.reducer,
  cart: cart.reducer,
  user: user.reducer,
  addVinyl: addVinyl.reducer,
})

const persistedStateJSON = localStorage.getItem("userReduxState");
let persistedState = {};

if (persistedStateJSON) {
  persistedState = JSON.parse(persistedStateJSON);
}

const composedEnhancers =
  (process.env.NODE_ENV !== "production" &&
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  reducer,
  persistedState,
  composedEnhancers(applyMiddleware(thunkMiddleware))
);

store.subscribe(() => {
  localStorage.setItem("userReduxState", JSON.stringify(store.getState()));
});

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="grid-container">
          <Header />
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/checkout" element={<CheckoutScreen />} />
            <Route path="/pay" element={<PayScreen />} />
            <Route path="/contact" element={<ContactScreen />} />
            <Route path="/upload" element={<UploadScreen />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
