import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "https://smart-deals-server-eight-xi.vercel.app",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    // Request Interceptor(mount)
    const requestInterceptor = instance.interceptors.request.use((config) => {
      if(user.accessToken) {
        config.headers.authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });

    // Response Interceptor
    const responseInterceptor = instance.interceptors.response.use(res => {
        return res;
    }, err => {
        const status = err.status;
        if(status === 401 || status === 403) {
            console.log("Bad Intention");
            signOutUser()
            .then(() => {
                navigate("/login");
            })
            .catch()
        }
    })


    // unmount
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.request.eject(responseInterceptor);
    };
  }, [user,signOutUser, navigate]);

  return instance;
};

export default useAxiosSecure;
