import axios from "axios";

const client = axios.create({baseURL :`${import.meta.env.VITE_PRODUCTION === 'remote' ? '':'http://localhost:3000'}`});

export default client;