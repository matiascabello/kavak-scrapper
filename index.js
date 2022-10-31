import express from 'express';
import * as path from 'path';
import * as url from 'url';
import * as dotenv from 'dotenv';
import * as cron from 'node-cron';
import { engine } from 'express-handlebars';

import { scrapTask, prevScrapping } from './scrapper.js';

dotenv.config();

const app = express();

app.engine('handlebars', engine({defaultLayout: 'scrapping'}));
app.set('view engine', 'handlebars');
app.set('views', './views');

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res, next) => {
    res.render('scrapping', {items: prevScrapping});
})

const scrapPath = 'https://www.kavak.com/ar/autos-Argo/ciudad-Buenos_Aires/autos-usados';

cron.schedule('0 0 */12 * *', () => {
    scrapTask(scrapPath);
})

// Cheat to keep Heroku app alive ;)

setInterval(() => {
    http.get("https://kavak-scrapper.herokuapp.com/");
  }, 25 * 60 * 1000); // every 25 minutes

  app.listen(process.env.PORT || 8000, () => console.log('App running'));