//Load Playwright Module
const {test,expect} = require('@playwright/test')
import {stringFormat} from '../utils/common.js'; // for generating dynamic test-data


const bookingAPIRequestBody = require('../test-data/post_dynamic_request_body.json')
const tokenRequestBody = require('../test-data/token_request_body.json')
const putRequestBody = require('../test-data/put_request_body.json')
//Write Test
test('Create PUT api request in Playwright',async({request})=>{
console.log("================Post Request=====================\n")
   const dynamicRequestBody = stringFormat(JSON.stringify(bookingAPIRequestBody), "Abhishek", "Kumar", "millets");
    
    //Create POST api request
const postResponse = await request.post('/booking',{
    data: JSON.parse(dynamicRequestBody)
})
const postResponseBody = await postResponse.json();
console.log(postResponseBody)

//validate status code 
await expect(postResponse).toBeOK();
await expect(postResponse.ok()).toBeTruthy();
await expect(postResponse.status()).toBe(200);

//Validate JSON api response 
await expect(postResponseBody.booking).toHaveProperty('firstname','Abhishek');
await expect(postResponseBody.booking).toHaveProperty('lastname','Kumar');
await expect(postResponseBody.booking).toHaveProperty('additionalneeds','millets');


//validate nested JSON objects
await expect(postResponseBody.booking.bookingdates).toHaveProperty('checkin','2018-01-01');
await expect(postResponseBody.booking.bookingdates).toHaveProperty('checkout','2019-01-01');

console.log("================Get Request=====================\n")

//Get API Call
const bId = postResponseBody.bookingid;
const getResponse = await request.get(`/booking/${bId}`);
const getResponseBody = await getResponse.json();
console.log(getResponseBody)

//Validate status code
await expect(getResponse).toBeOK();
await expect(getResponse.ok()).toBeTruthy();
await expect(getResponse.status()).toBe(200);

// //Validate get response body
// await expect(getResponseBody).toHaveProperty('firstname','Abhishek');
// await expect(getResponseBody).toHaveProperty('lastname','Kumar');
// await expect(getResponseBody).toHaveProperty('additionalneeds','millets');

//Generate Token for PUT api request
const tokenResponse = await request.post('/auth',{
    data: tokenRequestBody
})

const tokenResponseBody = await tokenResponse.json();
const tokenNumber = tokenResponseBody.token;
console.log("Token Number: " + tokenNumber)

//put api request(url:/booking/{bookingId}, data: request body, headers: content-type(application/json), cookie: token=tokenNumber)
 const putResponse = await request.put(`/booking/${bId}`,{
    headers:{
        'Content-Type': 'application/json',
        'Cookie': `token=${tokenNumber}`
    },
    data: putRequestBody

})
console.log("=================Put Request=====================\n")
const putResponseBody = await putResponse.json();
console.log(putResponseBody)
await expect(putResponse).toBeOK();
await expect(putResponse.ok()).toBeTruthy();
await expect(putResponse.status()).toBe(200);
})
