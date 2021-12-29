import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import ProductDesc from '../../components/products/ProductDesc'

export default function ProductsDetail(props) {
    const {id} = useParams()
    const [product, setProduct] = useState([])
    const [merchant, setMerchant] = useState([])

    const getProductDetail = (productId) => {
        axios.get('http://localhost:6969/product/'+productId)
        .then(res => {
            const productDetail = res.data
            axios.get('http://localhost:6969/merchant/'+res.data.MERCHANT_ID)
            .then(res2 => {
                const merchantDetail = res2.data
                setProduct(productDetail)
                setMerchant(merchantDetail)
            })
        })
    }

    useEffect(() => {
        if(localStorage.getItem('isLoggedIn') === null) {
            
        }

        getProductDetail(id)
    }, [id])

    return (
        <Fragment>
            <Header cart={props.cart} />
            { (props.loginInfo.length !== 0 & product.length !== 0 && merchant.length !== 0) && <ProductDesc loginInfo={props.loginInfo} product={product} merchant={merchant} />}
            <Footer />
        </Fragment>
    )
}