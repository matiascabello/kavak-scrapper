import axios from 'axios';
import cheerio from 'cheerio';
import { sendEmail } from './mailer.js'

export { scrapTask };

let prevScrapping = [{
    carTitle: ' Fiat Argo 1.8 Precision ',
    carPrice: ' $ 4.000.000 ',
    carId: '204456',
    carStatus: 'Booked'
  },
  {
    carTitle: ' Fiat Argo 1.3 Drive Gse Manual ',
    carPrice: ' $ 3.250.000 ',
    carId: '202201',
    carStatus: 'Booked'
  },
  {
    carTitle: ' Fiat Argo 1.3 Drive Gse Manual ',
    carPrice: ' $ 3.470.000 ',
    carId: '205350',
    carStatus: 'Booked'
  }];

let currentScrapping = [];

const scrapTask = async (url) => {
    
    const scrap = await axios(url)
    const html = scrap.data;
    const $ = cheerio.load(html);
    const items = [];

    $('.card-inner', html).each(function() {

        const carTitle = $(this).find('.car-name').text();
        const carPrice = $(this).find('.payment-amounts').text();
        const carUrl = $(this).attr('href');
        const carStatus = $(this).attr('data-cy').includes('booked') ? 'Booked' : 'Availabe';
        
        // Get Id of the item
        // Execute regular expression to extract the id from the url

        const regex = /[0-9]\w+$/g;
        const carId = carUrl.match(regex).toString();
        
        items.push({carTitle, carPrice, carId, carStatus});
        
    });

    if (prevScrapping.length == 0) {
        prevScrapping = items;
        return 'No items to compare. Current scrapping results were saved and will be compared with the result of the next scheduled scrapping.'
    } else {
        currentScrapping = items;
        return compareScrapResultAndReturnDifference(prevScrapping, currentScrapping);
    }
        
}

const compareScrapResultAndReturnDifference = (last, current) => {

    const prevScrappingIdList = extractId(last);
    const currentScrappingIdList = extractId(current);

    let newIds = currentScrappingIdList.filter(item => !prevScrappingIdList.includes(item));

    if (newIds.length != 0) {
        const newCars = newIds.map(id => {
            return current.find(car => {
                return car.carId === id
            })
        })


        sendEmail(newCars);

        return newCars;

    } else {

        return 'No new items.'

    }
}

const extractId = (array) => {

    const id = array.map(item => {
        return item.carId
    })

    return id
}