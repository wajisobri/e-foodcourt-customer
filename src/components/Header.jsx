import React, { Component } from 'react'
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

function buttonLogin() {
    if(localStorage.getItem('isLoggedIn') === null) {
        return <Link to="/login"><i className="fa fa-user"></i> Login</Link>
    } else {
        return <Link to="/logout"><i className="fa fa-user"></i> Logout</Link>
    }
}

function cartHamburger(data) {
    if(localStorage.getItem('isLoggedIn') !== null) {
        return (
            <div className="humberger__menu__cart">
                <ul>
                    <li><Link to="#"><i className="fa fa-shopping-bag"></i> <span>{data.TOTAL_ITEM}</span></Link></li>
                </ul>
                <div className="header__cart__price">total: <span><NumberFormat value={data.TOTAL_PRICE} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'Rp '} /></span></div>
            </div>
        )
    } else {
        return (
            <div className="humberger__menu__cart">

            </div>
        )
    }
}

function cartHeader(data) {
    if(localStorage.getItem('isLoggedIn') !== null) {
        return (
            <div className="header__cart">
                <ul>
                    <li><Link to="#"><i className="fa fa-shopping-bag"></i> <span>{data.TOTAL_ITEM}</span></Link></li>
                </ul>
                <div className="header__cart__price">total: <span><NumberFormat value={data.TOTAL_PRICE} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'Rp '} /></span></div>
            </div>
        )
    } else {
        return (
            <div className="header__cart">

            </div>
        )
    }
}

class Header extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="humberger__menu__overlay"></div>
                <div className="humberger__menu__wrapper">
                    <div className="humberger__menu__logo">
                        <Link to="/"><img src="/assets/img/logo.png" alt=""/></Link>
                    </div>
                    { this.props.cart.length !== 0 && cartHamburger(this.props.cart[0])}
                    <div className="humberger__menu__widget">
                        <div className="header__top__right__auth">
                            {buttonLogin()}
                        </div>
                    </div>
                    <nav className="humberger__menu__nav mobile-menu">
                        <ul>
                            <li className="active"><Link to="/">Home</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                        </ul>
                    </nav>
                    <div id="mobile-menu-wrap"></div>
                    <div className="humberger__menu__contact">
                        <ul>
                            <li><i className="fa fa-envelope"></i> hello@colorlib.com</li>
                            <li>Free Shipping for all Order of $99</li>
                        </ul>
                    </div>
                </div>

                <header className="header">
                    <div className="header__top">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <div className="header__top__left">
                                        <ul>
                                            <li><i className="fa fa-envelope"></i> hello@colorlib.com</li>
                                            <li>Free Shipping for all Order of $99</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="header__top__right">
                                        <div className="header__top__right__auth">
                                            {buttonLogin()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="header__logo">
                                    <Link to="/"><img src="/assets/img/logo.png" alt=""/></Link>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <nav className="header__menu">
                                    <ul>
                                        <li className="active"><Link to="/">Home</Link></li>
                                        <li><Link to="/products">Products</Link></li>
                                        <li><Link to="/cart">Cart</Link></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-lg-3">
                                { this.props.cart.length !== 0 && cartHeader(this.props.cart[0])}
                            </div>
                        </div>
                        <div className="humberger__open">
                            <i className="fa fa-bars"></i>
                        </div>
                    </div>
                </header>
            </React.Fragment>
        )
    }
}

export default Header;