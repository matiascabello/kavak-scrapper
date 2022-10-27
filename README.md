# Kavak scrapper

Web scrapper to cope with the unexisting alerts 🔔 feature of kavak.com.

It works like this:

- The program checks the results page for a specific car model every n hours.
- It compares the car list obtained by the current scrapping with the previous one.
- If it finds any difference, it uses the Twilio API to send an email notification with the new cars published on the website.

⚠️ Work in progress!
