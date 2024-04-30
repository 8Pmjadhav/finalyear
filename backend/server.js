import express from 'express';
import 'dotenv/config';
import fileUpload from 'express-fileupload';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middlewares : 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(fileUpload());

// routes :
import routes from './routes/index.js';
app.use('/api',routes);

app.get('/',(req,res)=>{
    return res.json({msg:"Connection successful"})
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})