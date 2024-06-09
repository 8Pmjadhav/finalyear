import axios from "axios";

const client = axios.create({baseURL :`${import.meta.env.VITE_PRODUCTION === 'remote' ? import.meta.env.VITE_BACKEND_SERVER: (import.meta.env.VITE_PRODUCTION === 'docker' ? import.meta.env.VITE_BACKEND_SERVER_DOCKER : 'http://localhost:3000')}`});

export default client;