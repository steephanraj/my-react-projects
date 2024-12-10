import { Link } from 'react-router-dom';

export default function Product({ product }) {

    return (
        <>
            <div className='col-md-4 col-sm-6 mb-4'>
                <div className="card p-3 rounded">
                    {product?.images && product?.images?.map((img, index) => (
                        <img
                            className="card-img-top mx-auto"
                            src={img}
                            alt="no image"
                            key={index}
                        />
                    ))}

                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">
                            <Link to={`/product/${product.id}`}>{product.title}</Link>
                        </h5>
                        <div className="ratings mt-auto">
                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${product.rating / 5 * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({product?.reviews?.length} Reviews)</span>
                        </div>
                        <p className="card-text">${product.price}</p>
                        <Link to={`/product/${product.id}`} id="view_btn" className="btn btn-block">View Details</Link>
                    </div>
                </div>
            </div>

        </>
    )
}