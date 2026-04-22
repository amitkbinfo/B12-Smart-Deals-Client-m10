import React from 'react';
import { ClockLoader } from 'react-spinners';

const LoadingSpinner = () => {
    return (
        <div className='min-h-50 flex items-center justify-center'>
            <ClockLoader color="#FB4231" />
        </div>
    );
};

export default LoadingSpinner;