import React, { Component } from 'react'
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

export default class ProductList extends Component {
    render() {
        const productsList = this.props.products.map((product) => {
            let category = []
            for(let i=0; i<product.CATEGORY.length; i++) {
                category.push(product.CATEGORY[i].NAME.replace(/\s+/g, '-').toLowerCase())
            }
            return (
                <div className={`col-lg-3 col-md-4 col-sm-6 mix ${category.join(' ')}`} key={product.ID}>
                    <div className="featured__item">
                        <div className="featured__item__pic set_bg" style={ { backgroundImage: `url('assets/img/featured/feature-${Math.floor(Math.random() * (8 - 1 + 1) ) + 1}.jpg')` } }>
                            <ul className="featured__item__pic__hover">
                                <li><Link to="/"><i className="fa fa-shopping-cart"></i></Link></li>
                            </ul>
                        </div>
                        <div className="featured__item__text">
                            <h6><Link to={`/product/${product.ID}`}>{product.TITLE}</Link></h6>
                            <h5><NumberFormat value={product.PRICE} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'Rp '} /></h5>
                        </div>
                    </div>
                </div>
            )
        });

        return (
            <div className="row featured__filter">
                {productsList}
            </div>
        )
    }
}