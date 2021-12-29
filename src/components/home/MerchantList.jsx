import React from 'react'
import { Link } from 'react-router-dom';

export default function MerchantList(props) {
    const merchantLists = props.merchants.map((merchant) => 
        <li key={merchant.ID}><Link to="/">{merchant.NAME}</Link></li>
    );
        
    return (
        <ul>
            {merchantLists}
        </ul>
    )
}
