import React, { use } from 'react';
import ProductCard from './ProductCard';

const LatestProducts = ({latestProductPromise}) => {
    const products = use(latestProductPromise);
    return (
        <div className='my-10 w-10/12 mx-auto'>
            <h1 className='text-3xl font-semibold text-center'>Latest Products</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-12'>
                {
                    products.map(product => <ProductCard product={product}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default LatestProducts;