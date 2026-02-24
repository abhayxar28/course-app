import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/user.routes.js'
import courseRoute from './routes/course.routes.js'
import lectureRoute from './routes/lecture.routes.js'
import videoRoute from './routes/video.routes.js'
import db from './db/db.js';
import stripeRoute from './routes/stripe.routes.js'

dotenv.config();
await db();

const app = express();
const PORT = process.env.PORT || 3000
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     limit: 100,
//     message: "Too many request from this IP, please try later"
// });

app.use(express.json({limit: "10kb"}))
app.use(express.urlencoded({extended: true, limit: "10kb"}))
app.use(cookieParser());

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

// app.use("/api", limiter)


app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET", "HEAD", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
    ]
}))

app.use('/api/v1/users', userRoute)
app.use('/api/v1/courses', courseRoute)
app.use('/api/v1/lectures', lectureRoute)
app.use('/api/v1/videos', videoRoute)
app.use('/api/v1/stripe', stripeRoute)

app.use((_req, res)=>{
    res.status(404).json({
        status: "error",
        message: "Route not found !!"
    });
});

app.listen(PORT, ()=>{
    console.log(`server listening on port: ${PORT}`);
})