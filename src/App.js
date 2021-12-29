import React, { Component } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import axios from 'axios';

import Home from './pages/Home';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import ProductsDetail from './pages/Products/ProductsDetail';
import Cart from './pages/Cart/Cart';

export default class App extends Component {
  state = {
    loginInfo: [],
    cart: []
  }

  async getCart(customerId) {
    const res = await axios.get('http://localhost:6969/cart/'+customerId);
    return await res.data;
  }

  componentDidMount() {
    if(localStorage.getItem('isLoggedIn') !== null) {
      const customerId = localStorage.getItem('customerId');
      this.getCart(customerId)
      .then(data => this.setState({
        cart: data
      }))

      axios.get('http://localhost:6969/customer/'+customerId)
      .then(res => {
          this.setState({
              loginInfo: res.data
          })
      })
    } else {
      this.setState({
        loginInfo: [],
        cart: []
      })
    }
  }
  
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" exact
            element={<Home loginInfo={this.state.loginInfo} cart={this.state.cart} />} />
          <Route path="/product/:id" exact
            element={<ProductsDetail loginInfo={this.state.loginInfo} cart={this.state.cart} />} />
          <Route path="/cart" exact
            element={<Cart loginInfo={this.state.loginInfo} cart={this.state.cart} />} />
          <Route path="/login" exact
            element={<Login />} />
          <Route path="/logout" exact
            element={<Logout />} />
          <Route path="*" element={<Navigate to ="/" />} />
        </Routes>
      </BrowserRouter>
    )
  }
}