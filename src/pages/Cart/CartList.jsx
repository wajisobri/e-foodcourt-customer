import axios from 'axios';
import React, { Fragment } from 'react'
import NumberFormat from 'react-number-format'
import { Link } from 'react-router-dom'

export default function CartList(props) {
    let cartItems = [...props.cartItem]

    async function deleteCartItem(item) {
        console.log(item)
        await axios.delete('http://localhost:6969/cart/delete', item);
    }

    function handleQtyChange(e, i) {
        let selItem = {...cartItems[i]}
        selItem.QUANTITY = e.target.value
        cartItems[i] = selItem

        let itemUpdated = {
            customer_id: localStorage.getItem("customerId"),
            product_id: selItem.PRODUCT_ID,
            quantity: selItem.QUANTITY,
            note: ''
        }

        props.onChange(cartItems, itemUpdated)
    }

    function handleNoteChange(e, i) {
        let selItem = {...cartItems[i]}
        selItem.NOTE = e.target.value
        cartItems[i] = selItem
    }

    function handleNoteSubmit(e, i) {
        e.preventDefault();
        let itemUpdated = {
            customer_id: localStorage.getItem("customerId"),
            product_id: cartItems[i].PRODUCT_ID,
            quantity: cartItems[i].QUANTITY,
            note: cartItems[i].NOTE
        }
        props.onChange(cartItems, itemUpdated)
    }

    function handleItemDelete(productID) {
        const item = {
            customer_id: parseInt(localStorage.getItem("customerId")),
            product_id: productID
        }

        deleteCartItem(item)
    }

    const cartItemList =
        props.cartItem.map((item, index) => {
            let cartItem = {...cartItems[index]}
            return (
                <tr key={item.PRODUCT_ID}>
                    <td className="shoping__cart__item">
                        <img src="/assets/img/cart/cart-1.jpg" alt="" />
                        <h5>{item.TITLE}</h5>
                    </td>
                    <td className="shoping__cart__price">
                        <NumberFormat value={item.PRICE} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'Rp '} />
                    </td>
                    <td className="shoping__cart__quantity">
                        <div className="quantity">
                            <div className="pro-qty">
                                <input type="number" value={cartItem.QUANTITY} onChange={(e) => {handleQtyChange(e,index)}} />
                            </div>
                        </div>
                    </td>
                    <td className="shoping__cart__quantity">
                        <div className="contact-form spad">
                            <form onSubmit={(e) => {handleNoteSubmit(e,index)}}>
                                <textarea value={cartItems[index].NOTE === null ? '' : cartItems[index].NOTE} onChange={(e) => handleNoteChange(e,index)}></textarea>
                                <input className="primary-btn cart-btn cart-btn-right" type="submit" value="Update" />
                            </form>
                        </div>
                    </td>
                    <td className="shoping__cart__total">
                        <NumberFormat value={item.PRICE*item.QUANTITY} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'Rp '} />
                    </td>
                    <td className="shoping__cart__item__close">
                        <span onClick={() => handleItemDelete(item.PRODUCT_ID)} className="icon_close"></span>
                    </td>
                </tr>
            )
        })

    return (
        <Fragment>
            <section className="breadcrumb-section set_bg" style={ { backgroundImage: `url('/assets/img/breadcrumb.jpg')` } }>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Shopping Cart</h2>
                                <div className="breadcrumb__option">
                                    <Link to="/">Home</Link>
                                    <span>Shopping Cart</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="shoping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="shoping__product">Products</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Note</th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItemList}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="shoping__cart__btns">
                                <Link to="/" className="primary-btn cart-btn">CONTINUE SHOPPING</Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="shoping__checkout">
                                <h5>Cart Total</h5>
                                <ul>
                                    <li>Total Item <span>{props.cart[0].TOTAL_ITEM}</span></li>
                                    <li>Total Price <span>{props.cart[0].TOTAL_PRICE}</span></li>
                                </ul>
                                <Link to="#" className="primary-btn">PROCEED TO CHECKOUT</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}