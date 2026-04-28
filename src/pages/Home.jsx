import React from 'react';
import LatestProducts from './LatestProducts';
const latestProductPromise = fetch("https://smart-deals-server-eight-xi.vercel.app/latest-products").then(res=>res.json());
const Home = () => {
    return (
        <div>
            <LatestProducts latestProductPromise={latestProductPromise}>

            </LatestProducts>
        </div>
    );
};

export default Home;