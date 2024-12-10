import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import { useSelector } from "react-redux"


export default function Header() {


    const list = useSelector(state => state.cart.list);

    const count = list && list.reduce((acc, item) => acc + item.count, 0);
    console.log('count', count)



    return (
        <nav className="navbar row">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <Link to="/">
                        <img width="150px" alt='JVLcart Logo' src="/images/logo123.png" />
                    </Link>
                </div>
            </div>

            <div className="col-12 col-md-6 mt-2 mt-md-0">
                <Search />
            </div>

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                <Link to="/cart"><span id="cart" className="ml-3">Cart</span></Link>
                <span className="ml-1" id="cart_count">{count}</span>
            </div>
        </nav>
    )
}