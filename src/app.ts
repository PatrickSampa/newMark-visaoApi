import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import { rotasTestes } from './routes/Router';

const app = express();

app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(logger('dev'));

app.use(rotasTestes);

export { app };
