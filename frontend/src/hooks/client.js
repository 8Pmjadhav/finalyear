import axios from "axios";

const client = axios.create({baseURL :`${import.meta.env.VITE_PRODUCTION === 'remote' ? 'https://project-iunl.onrender.com': (import.meta.env.VITE_PRODUCTION === 'docker' ? 'http://backend_c:3000' : 'http://localhost:3000')}`});

export default client;