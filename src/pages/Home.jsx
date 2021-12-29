import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header';
import Footer from '../components/Footer';
import MerchantList from '../components/home/MerchantList';
import ProductList from '../components/home/ProductList';
import CategoryList from '../components/home/CategoryList';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            merchants: [],
            products: [],
            categories: [],
            cart: []
        };
    }

    componentDidMount() {
        this.setState({
            cart: this.props.cart
        })
        
        axios.get('http://localhost:6969/merchant/available')
        .then(res => {
            this.setState({
                merchants: res.data
            })
        })

        axios.get('http://localhost:6969/category/all')
        .then(res => {
            this.setState({
                categories: res.data
            })
        })

        axios.get('http://localhost:6969/product/available')
        .then(res => {
            this.setState({
                products: res.data
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <Header cart={this.props.cart} />
                <section className="hero">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="hero__categories">
                                    <div className="hero__categories__all">
                                        <i className="fa fa-bars"></i>
                                        <span>List Merchants</span>
                                    </div>
                                    <MerchantList merchants={this.state.merchants} />
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="hero__search">
                                    <div className="hero__search__form">
                                        <form action="#">
                                            <input type="text" placeholder="What do yo u need?"/>
                                            <button type="submit" className="site-btn">SEARCH</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="hero__item set_bg" style={ { backgroundImage: "url('assets/img/hero/banner.jpg')" } }>
                                    <div className="hero__text">
                                        <span>WE ARE OPEN</span>
                                        <h2>E-Food<br />Court</h2>
                                        <p>Free Pickup and Delivery Available</p>
                                        <Link to="/" className="primary-btn">SHOP NOW</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="featured spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title">
                                    <h2>Product</h2>
                                </div>
                                <div className="featured__controls">
                                    <CategoryList categories={this.state.categories} />
                                </div>
                            </div>
                        </div>
                        <ProductList products={this.state.products} />
                    </div>
                </section>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default Home;