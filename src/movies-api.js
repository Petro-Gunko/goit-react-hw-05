import axios from "axios";
const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
const options = {
    headers: {
        Authorization:
            "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDliZjJiMzU2MGU1NDljYzZkMTdiMDI3ZDIwZTlkYyIsInN1YiI6IjY2MmMxZTcyZWZjZWE5MDEyODEzNTc4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DpvI2464dEAKLCcbYXHMaEvGQ1A2cq6U2iNcHc6ZTLU",
    },
};
export const getTrendingMovies = async () => {
    const response = await axios.get(url, options);
    return response.data;
};

const baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.baseURL = baseURL;

export const fetchMovieById = async (movieId) => {
    const response = await axios.get(`movie/${movieId}?language=en-US`, options)
    return response.data
}

export const fetchCast = async (movieId) => {
    const response = await axios.get(`movie/${movieId}/credits?language=en-US`, options)
    return response.data
}

export const fetchReviews = async (movieId) => {
    const response = await axios.get(`movie/${movieId}/reviews?language=en-US&page=1`, options)
    return response.data
}

export const fetchSearchMovie = async (text) => {
    const response = await axios.get(`search/movie?query=${text}&include_adult=false&language=en-US&page=1`, options)
    return response.data
}
// axios.defaults.baseURL = "https://65c23f3af7e6ea59682af8d1.mockapi.io";

// export const getPayments = async () => {
//     const response = await axios.get("/payments");
//     return response.data;
// };

// export const getPaymentById = async (paymentId) => {
//     const response = await axios.get(`/payments/${paymentId}`);
//     return response.data;
// };