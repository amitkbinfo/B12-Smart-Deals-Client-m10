import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import LoadingSpinner from '../pages/LoadingSpinner';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = use(AuthContext);
    const location = useLocation();console.log(location);
    if(loading) {
        <LoadingSpinner></LoadingSpinner>
    }

    if(!user) {
        return <Navigate to="/login" state={location?.pathname}></Navigate>
    }

    return children;
};

export default PrivateRoute;