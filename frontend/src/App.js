import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { shop } from './reducers/shop'
import { cart } from './reducers/cart'

import Header from './components/Header'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import ProductScreen from './screens/ProductScreen'
import HomeScreen from './screens/HomeScreen'
import CartScreen from './screens/CartScreen'
import CheckoutScreen from './screens/CheckoutScreen'
import PayScreen from './screens/PayScreen'
import ContactScreen from './screens/ContactScreen'



////////////////
const reducer = combineReducers({
  shop: shop.reducer,
  cart: cart.reducer,
})

const store = configureStore({ reducer })
///////////////

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
              <Route path="*" element={<NotFound />} />
            </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider> 
  );
}

export default App;
