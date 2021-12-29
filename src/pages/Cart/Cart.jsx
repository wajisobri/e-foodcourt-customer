import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import CartList from './CartList'

export default function Cart(props) {
    const customerId = localStorage.getItem("customerId")
    const [cartItem, setCartItem] = useState([])

    async function updateCartItem(item) {
        await axios.put('http://localhost:6969/cart/update', item);
    }

    function handleCartItemChange(val, item) {
        setCartItem(val)
        updateCartItem(item)
        window.location.reload(false)
    }

    const getCartItem = (customerId) => {
        axios.get('http://localhost:6969/cart/'+customerId+'/detail')
        .then(res => {
            const cartItemDetail = res.data
            setCartItem(cartItemDetail)
        })
    }

    useEffect(() => {
        getCartItem(customerId)
    }, [customerId])

    return (
        <Fragment>
            <Header cart={props.cart} />
            { (props.loginInfo.length !== 0 && props.cart.length !== 0 && cartItem.length !== 0) && <CartList loginInfo={props.loginInfo} cart={props.cart} cartItem={cartItem} onChange={handleCartItemChange} />}
            <Footer />
        </Fragment>
    )
}