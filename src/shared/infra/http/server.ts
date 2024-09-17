
import 'reflect-metadata';
import { config } from 'dotenv';
import express, {NextFunction, Request, Response} from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '../../errors/AppError';
import '../typeorm';
import '../../container';
import uploadConfig from "../../../config/upload"
import rateLimiter from '../http/middlewares/rateLimiter';

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);
app.use(errors());
app.use((error: Error, request: Request, response: Response, next: NextFunction ) =>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }
    console.info(error);
    
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
}, [])

app.listen(3333 ,() =>{
    console.log('Server is running on port 🚀 ' + 3333 );
})