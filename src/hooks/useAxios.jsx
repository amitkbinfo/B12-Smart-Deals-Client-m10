import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://smart-deals-server-eight-xi.vercel.app'
})

const useAxios = () => {
    return axiosInstance;
}

export default useAxios;