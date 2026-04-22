import React from 'react';
import LatestProducts from './LatestProducts';
const latestProductPromise = fetch("http://localhost:3000/latest-products").then(res=>res.json());
const Home = () => {
    return (
        <div>
            <LatestProducts latestProductPromise={latestProductPromise}>

            </LatestProducts>
        </div>
    );
};

export default Home;