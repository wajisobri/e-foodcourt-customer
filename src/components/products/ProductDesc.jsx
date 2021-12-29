import React, { Fragment, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import NumberFormat from 'react-number-format'
import { Link } from 'react-router-dom'
import Reviews from './Reviews'

async function addToCart(data) {
    return fetch('http://localhost:6969/customer/addtocart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(data => data.json())
}

export default function ProductDesc(props) {
    const [quantity, setQuantity] = useState('1')

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            customer_id: props.loginInfo[0].ID,
            product_id: props.product.ID,
            quantity: quantity,
            note: ''
        }
        console.log(props.loginInfo)
        const response = await addToCart(data);

        alert(response.message)
        window.location.reload(false)
    }

    let category = []
    for(let i=0; i<props.product.CATEGORY.length; i++) {
        category.push(props.product.CATEGORY[i].NAME)
    }
    return (
        <Fragment>
            <section className="breadcrumb-section set_bg" style={ { backgroundImage: `url('/assets/img/breadcrumb.jpg')` } }>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>{props.product.TITLE}</h2>
                                <div className="breadcrumb__option">
                                    <Link to="/">Home</Link>
                                    <span>{props.product.TITLE}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="product-details spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="product__details__pic">
                                <div className="product__details__pic__item">
                                    <img className="product__details__pic__item--large"
                                        src="/assets/img/product/details/product-details-1.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="product__details__text">
                                <h3>{props.product.TITLE}</h3>
                                <div className="product__details__rating">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-half-o"></i>
                                    <span>(18 reviews)</span>
                                </div>
                                <div className="product__details__price"><NumberFormat value={props.product.PRICE} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'Rp '} /></div>
                                <p>{props.product.DESCRIPTION}</p>
                                <ul>
                                    <li><b>Availability</b> <span>{(props.product.STOCK > 0) ? 'In Available' : 'Not Available' } ({props.product.STOCK} stock)</span></li>
                                    <li><b>Merchant</b> <span>{props.merchant[0].NAME} <samp>(Phone: {props.merchant[0].PHONE})</samp></span></li>
                                    <li><b>Category</b> <span>{category.join(', ')}</span></li>
                                </ul>
                                <div className="contact-form spad">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-lg-2 text-center">
                                                <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                            </div>
                                        </div>
                                        <button type="submit" className="primary-btn">ADD TO CART</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="product__details__tab">
                                <Tabs
                                    defaultActiveKey="desc"
                                    transition={false}
                                    id="noanim-tab-example"
                                    className="mb-3"
                                    >
                                    <Tab eventKey="desc" title="Description">
                                        <div className="product__details__tab__desc">
                                            <h6>Product Description</h6>
                                            <p>{props.product.DESCRIPTION}.</p>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="review" title="Reviews">
                                        <Reviews />
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}