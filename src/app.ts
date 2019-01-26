import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import { loadEnv } from './util/loadEnv';

// Load Env Variables
loadEnv();

const app = express();

app.set('PORT', process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('short'));

export { app };
