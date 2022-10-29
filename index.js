import express from 'express';
import * as dotenv from 'dotenv';
import * as cron from 'node-cron';

import { scrapTask } from './scrapper.js';

dotenv.config();

const app = express();

app.listen(process.env.PORT || 8000, () => console.log('App running'));

const url = 'https://www.kavak.com/ar/autos-Argo/ciudad-Buenos_Aires/autos-usados';

cron.schedule('0 0 */12 * *', () => {
    scrapTask(url);
})

