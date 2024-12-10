import { Fragment } from "react";
import { useSelector } from "react-redux";
import Product from "./Product";
import { useNavigate, useParams } from "react-router-dom";


export default function ProductSearch() {
    const { keyword } = useParams();
    const products = useSelector((state) => state.products.productsData);
    const navigate = useNavigate();

    console.log('products', products);


    const filteredProducts = products?.filter((product) => {
        console.log('product low', product);
        const matchesSearch = product?.title?.toLowerCase().includes(keyword.toLowerCase());
        return matchesSearch;
    });



    return (
        <Fragment>
            <h1 id="products_heading">Search Products</h1>
            <section id="products" className="container mt-5">
                <div className="row">

                    <div className="col-6 col-md-9">
                        <div className="row">
                            {filteredProducts && filteredProducts.map(product => (
                                <Product col={4} key={product.id} product={product} />
                            ))}
                        </div>

                    </div>

                </div>
                <button className="btn btn-outline-warning" onClick={() => navigate('/')}>Back to Home</button>
            </section>
        </Fragment>
    )
}