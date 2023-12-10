/** source/server.ts */
import express, { Express } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import userRouter from './routes/UserRoute';
import DbConnect from './config/database/DbConnect';
import cookieParser from 'cookie-parser';
import cors from 'cors';


// import the .env file

const router: Express = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    withCredentials: true,
};
router.use(cors(corsOptions));
dotenv.config();

// Logging 
router.use(morgan('dev'));
// Parse the request 
router.use(express.urlencoded({ extended: false }));
// Takes care of the JSON data
router.use(express.json());
// Cookie-Parser middleware 
router.use(cookieParser());
DbConnect();

// Routes
router.use('/scrollme/forum/api/v1', userRouter);

// Error handling
router.use((req, res, next) => {
    const error = new Error('Not Found');
    return res.status(404).json({
        status: '404 Not Found',
        code: 404,
        message: error.message,
        timestamp: new Date().toLocaleString('en-US', { formatMatcher: 'best fit' }),
    });
});


// Server
const PORT: any = process.env.PORT || 8080;
router.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
