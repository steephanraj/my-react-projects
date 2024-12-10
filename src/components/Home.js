import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsData } from "../slices/productSlice";
import Product from "./Product";
import CarouselComponent from "./CarouselComponent";



export default function Home() {
    const dispatch = useDispatch();
    const { productsData } = useSelector((state) => state.products);

    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        dispatch(getProductsData())
    }, [dispatch]);

    const handleCategoryChange = (item) => {
        setSelectedCategory(item);
    };



    const filteredProducts = productsData.filter((product) => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesCategory;
    });


    let uniquevalues = productsData && productsData.map(item => item.category).filter((value, index, self) =>
        self.indexOf(value) === index);



    return (

        <Fragment>
            <CarouselComponent />
            <h1 id="products_heading">Latest Products</h1>
            <section className="container-fluid mt-4">

                <div className='row'>
                    {/* categories section */}
                    <div className='col-lg-2 col-md-4 col-sm-12 mb-4'>
                        <div className='bg-light p-3 border rounded'>
                            <ul style={{ "cursor": "pointer" }}>
                                <li onClick={() => handleCategoryChange('All')}>All</li>
                                {uniquevalues && uniquevalues.map((category, index) => (
                                    <li key={index} value={category} onClick={() => handleCategoryChange(category)}>{category}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* product list section */}
                    <div className='col-lg-10 col-md-8 col-sm-12'>
                        <div className='bg-white p-3 border rounded'>
                            <h4>product list</h4>
                            <div className="row">
                                {selectedCategory == 'All' ? productsData && productsData.map((product, index) => (
                                    <Product col={3} key={index} product={product} />
                                ))
                                    :

                                    filteredProducts && filteredProducts.map((product, index) => (
                                        <Product col={3} key={index} product={product} />
                                    ))
                                }

                            </div>
                        </div>

                    </div>

                </div>

            </section>
        </Fragment>

    )
}