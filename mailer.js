import sendgrid from '@sendgrid/mail';
import * as dotenv from 'dotenv';
dotenv.config();

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

const formatHtml = (cars) => {
	let result;
	cars.forEach(car=> {
  result += `
  	<ul>
    	<li>Title: ${car.carTitle}</li>
      <li>Price: ${car.carPrice}</li>
      <li>Status: ${car.carStatus}</li>
      <li>Id: ${car.carId}</li>
    </ul>
    <hr>
  `
  })

  return result
}

const sendEmail = (cars) => {
    
    const msg = {
        to: process.env.EMAIL_TO, // Change to your recipient
        from: process.env.EMAIL_FROM, // Change to your verified sender
        subject: 'New cars published in Kavak',
        text: '',
        html: formatHtml(cars),
      }

    sendgrid.send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
    }

export { sendEmail };