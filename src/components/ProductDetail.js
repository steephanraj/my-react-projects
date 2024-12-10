import { Fragment, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { Carousel, Modal } from 'react-bootstrap';
import ProductReview from "./ProductReview";
import { addItem } from "../slices/cartSlice";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ProductDetail(reviewId = null) {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    const list = useSelector(state => state.cart.list);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showReview, setShowReview] = useState(false);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1);
    const [productReview, setProductReview] = useState(null);
    const handleCloseReview = () => setShowReview(false);
    const handleShowReview = () => setShowReview(true);

    const getproductList = useSelector((state) => state.products.productsData);

    const reviews = useSelector(state => state.reviews.reviews);

    const product = getproductList.find((element) => element.id === String(params.id));


    console.log('productReview', productReview);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/products/${product.id}`);
                setProductReview(response.data);
            } catch (err) {
                console.log('err', err);
            }

        };

        fetchProduct();
    }, [product.id]);

    const handleReviewUpdate = (updatedProduct) => {
        setProductReview(updatedProduct);
    };

    const element = list.find((item) => item.id === product.id);

    const increaseQty = () => {
        const count = document.querySelector('.count')
        if (product.stock == 0 || count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    }
    const decreaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber == 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    }

    const addToCart = () => {

        dispatch(addItem({ ...product, count: quantity }));
        toast.success("Item added successfully", { autoClose: 2000 });

    }


    const handleSubmit = () => {
        addToCart();
        handleClose();
    }
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (rating > 0 && comment) {

            const reviewData = {
                id: reviewId || Date.now(),
                rating: parseInt(rating, 10),
                comment: comment,
            };

            const updatedProduct = { ...productReview };
            const existingReviewIndex = updatedProduct.reviews.findIndex(
                (review) => review.id === reviewData.id
            );

            if (existingReviewIndex !== -1) {
                // If the review by the user exists, update the review
                updatedProduct.reviews[existingReviewIndex] = { ...reviewData };
            } else {
                // Otherwise, add the new review
                updatedProduct.reviews.push(reviewData);
            }

            // Send the updated product to the backend
            try {
                const response = await axios.put(`http://localhost:3000/products/${product.id}`, updatedProduct, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('response', response);

                // Call the parent handler to update the product in the parent component
                handleReviewUpdate(response.data);
            } catch (error) {
                console.error('Failed to update review', error);
            }
            setRating(0);
            setComment('');
            handleCloseReview();
        }
    }

    //console.log('reviews', reviews);



    return (

        <Fragment>

            <div className="row f-flex justify-content-around">
                <div className="col-12 col-lg-5 img-fluid" id="product_image">
                    <Carousel pause="hover">
                        {product?.images?.map((image, index) =>
                            <Carousel.Item interval={1000} key={index}>
                                <img className="d-block w-100" src={image} alt={product.title} height="500" width="500" />
                            </Carousel.Item>
                        )}
                    </Carousel>
                </div>

                <div className="col-12 col-lg-5 mt-5">
                    <h3>{product.title}</h3>
                    <p id="product_id">Product # {product.id}</p>

                    <hr />

                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${product.rating / 5 * 100}%` }}></div>
                    </div>
                    <span id="no_of_reviews">({product.reviews.length} Reviews)</span>

                    <hr />

                    <p id="product_price">${product.price}</p>
                    <div className="stockCounter d-inline">
                        <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                        <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                        <span className="btn btn-primary plus" onClick={increaseQty} >+</span>
                    </div>
                    {element && element.count >= 1 ? (
                        <button type="button" id="cart_btn"
                            disabled={product.stock == 0 ? true : false}
                            className="btn btn-primary d-inline ml-4"
                            onClick={() => navigate('/cart')}
                        >Go to Cart</button>
                    ) : (
                        <button type="button" id="cart_btn"
                            disabled={product.stock == 0 ? true : false}
                            className="btn btn-primary d-inline ml-4"
                            onClick={handleShow}
                        >Add To Cart</button>
                    )}


                    <hr />

                    <p>Status: <span className={product.stock > 0 ? 'greenColor' : 'redColor'} id="stock_status">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                    <hr />

                    <h4 className="mt-2">Description:</h4>
                    <p>{product.description}</p>
                    <hr />


                    <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" onClick={handleShowReview}>
                        Submit Your Review
                    </button>

                    <div className="row mt-2 mb-5">
                        <div className="rating w-50">
                            <Modal
                                show={showReview}
                                onHide={handleCloseReview}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Submit Review</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <ul className="stars" >
                                        {
                                            [1, 2, 3, 4, 5].map(star => (
                                                <li
                                                    value={star}
                                                    onClick={() => setRating(star)}
                                                    className={`star ${star <= rating ? 'orange' : ''}`}
                                                    onMouseOver={(e) => e.target.classList.add('yellow')}
                                                    onMouseOut={(e) => e.target.classList.remove('yellow')}

                                                ><i className="fa fa-star"></i></li>
                                            ))
                                        }


                                    </ul>

                                    <textarea name="review"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)} id="review" className="form-control mt-3">

                                    </textarea>
                                    <button aria-label="Close" className="btn my-3 float-right review-btn px-4 text-white" onClick={handleReviewSubmit}>Submit</button>
                                </Modal.Body>

                            </Modal>
                        </div>
                    </div>

                </div>

            </div>

            {

                (productReview && productReview.reviews && productReview.reviews.length > 0) ? <ProductReview reviews={productReview.reviews} /> : <ProductReview reviews={product.reviews} />

            }

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add to basket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are You Sure Want This {product.title}.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>

    )
}