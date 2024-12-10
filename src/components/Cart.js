import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { modifyItem, removeItem, clearCart } from '../slices/cartSlice';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Cart() {
    const items = useSelector(state => state.cart.list)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const incrementItem = (item) => {
        dispatch(modifyItem({ ...item, count: item.count + 1 }));

    }

    const decrementItem = (item) => {
        if (item.count === 1) {
            dispatch(removeItem(item));

        } else {
            dispatch(modifyItem({ ...item, count: item.count - 1 }));
        }

    }
    const removeItemFromCart = (item) => {
        dispatch(removeItem(item));
        toast.error("Item Removed from the Cart", { autoClose: 2000 });
    }

    console.log('items', items);




    // const checkoutHandler = () => {
    //     navigate('/login?redirect=shipping')
    // }

    const orderSuccess = () => {
        navigate('/order/success');
        dispatch(clearCart(items));
    }


    return (
        <Fragment>
            {items.length == 0 ?
                <h2 className="mt-5">Your Cart is Empty! Go to the <Link to={`/`}>Home Page</Link></h2> :
                <Fragment>
                    <h2 className="mt-5">Your Cart: <b>{items.length} items</b></h2>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {items.map(item => (
                                <Fragment key={item.product}>
                                    <hr />
                                    <div className="cart-item">
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={item?.images[0]} alt={item.title} height="90" width="115" />
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/product/${item.product}`}>{item.title}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">${item.price}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus" onClick={() => decrementItem(item)}>-</span>
                                                    <input type="number" className="form-control count d-inline" value={item.count} readOnly />

                                                    <span className="btn btn-primary plus" onClick={() => incrementItem(item)}>+</span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" onClick={() => removeItemFromCart(item)} className="fa fa-trash btn btn-danger"></i>
                                            </div>

                                        </div>
                                    </div>
                                </Fragment>
                            )
                            )
                            }


                            <hr />
                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal:  <span className="order-summary-values">{items.reduce((acc, item) => (acc + item.count), 0)} (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">${new Intl.NumberFormat('en-DE').format(items.reduce((acc, item) => (acc + item.count * item.price), 0))}</span></p>

                                <hr />
                                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={orderSuccess}>Check out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }

        </Fragment>
    )
}