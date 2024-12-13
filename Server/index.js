import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import emailRouter from './emailRoute.js';



const app = express();
app.use(cors({origin: "https://emailsendingapplication-1.onrender.com"}));
app.use(express.json());

const PORT= process.env.PORT;

app.use('/api', emailRouter);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})