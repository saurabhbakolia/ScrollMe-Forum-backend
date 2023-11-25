/** source/server.ts */
import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';


const router: Express = express();

// Logging 
router.use(morgan('dev'));
// Parse the request 
router.use(express.urlencoded({ extended: false }));
// Takes care of the JSON data
router.use(express.json());

// Rules of our API
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*'); // allow all origins
    // set the CORS headers 
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With, Content-Type, Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next(); // move on to the next middleware
});


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
const PORT: any = process.env.PORT || 3000;
router.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
