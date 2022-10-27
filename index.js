import express from 'express';
import * as dotenv from 'dotenv';

import { scrapTask } from './scrapper.js';

dotenv.config();

const app = express();

app.listen(process.env.PORT || 8000, () => console.log('App running'));

const url = 'https://www.kavak.com/ar/autos-Argo/ciudad-Buenos_Aires/autos-usados';

scrapTask(url);