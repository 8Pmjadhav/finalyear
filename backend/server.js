import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middlewares : 
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}));
app.use(cookieParser());

// routes :
import routes from './routes/index.js';
app.use('/api',routes);

app.get('/',(req,res)=>{
    return res.json({msg:"Connection successful"})
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})