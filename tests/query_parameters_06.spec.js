//Load Playwright Module
const {test,expect} = require('@playwright/test')
import {stringFormat} from '../utils/common.js'; // for generating dynamic test-data


const bookingAPIRequestBody = require('../test-data/post_dynamic_request_body.json')

//Write Test
test('query Parameters api request using Dynamic Json file',async({request})=>{

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

console.log("================Query Parameters=====================\n")

//checking whether particular resource is available or not using query parameters
const getResponse = await request.get(`/booking/`,{
    params:{
        firstname: "Abhishek", // get response body returns [ { bookingid: 2732 }, { bookingid: 3855 } ]
        // lastname: "Kumar"
        // firstname: "abbsddjkfngvnmedm", // []
    }
});
const getResponseBody = await getResponse.json();
console.log(getResponseBody)//get response body returns when query parameters doesnot match []

//Validate status code
await expect(getResponse).toBeOK();
await expect(getResponse.ok()).toBeTruthy();
await expect(getResponse.status()).toBe(200);





})



