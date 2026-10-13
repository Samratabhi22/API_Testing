//Load Playwright Module
const {test,expect} = require('@playwright/test')
import {faker} from '@faker-js/faker'; // for generating random test-data
import { DateTime } from 'luxon';// for generating date and time (don't write dateTime in small leetter)


//Write Test
test('Create POST api request using Dynamic request body',async({request})=>{

    //create random dats using faker library
    const randomFirstName = faker.person.firstName();
    const randomLastName = faker.person.lastName();
    const randomTotalPrice = faker.number.int(1000);

    const checkInDate = DateTime.now().toFormat('yyyy-MM-dd');
    const checkOutDate = DateTime.now().plus({days:5}).toFormat('yyyy-MM-dd');

    //Create POST api request
    const postResponse = await request.post('/booking',{
    data:{
    "firstname": randomFirstName,
    "lastname": randomLastName,
    "totalprice": randomTotalPrice,
    "depositpaid": true,
    "bookingdates": {
        "checkin": checkInDate,
        "checkout": checkOutDate
    },
    "additionalneeds": "super bowls"
    }
})
const postResponseBody = await postResponse.json();
console.log(postResponseBody)

//validate status code 
await expect(postResponse).toBeOK();
await expect(postResponse.ok()).toBeTruthy();
await expect(postResponse.status()).toBe(200);

//Validate JSON api response 
await expect(postResponseBody.booking).toHaveProperty('firstname', randomFirstName);
await expect(postResponseBody.booking).toHaveProperty('lastname', randomLastName);


//validate nested JSON objects
await expect(postResponseBody.booking.bookingdates).toHaveProperty('checkin', checkInDate);
await expect(postResponseBody.booking.bookingdates).toHaveProperty('checkout', checkOutDate);
})



