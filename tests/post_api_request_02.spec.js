//Load Playwright Module
const {test,expect} = require('@playwright/test')
const bookingAPIRequestBody = require('../test-data/post_request_body.json')

//Write Test
test('Create POST api request using Static Json file',async({request})=>{
    //Create POST api request
const postResponse = await request.post('/booking',{
    data:bookingAPIRequestBody
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


//validate nested JSON objects
await expect(postResponseBody.booking.bookingdates).toHaveProperty('checkin','2018-01-01');
await expect(postResponseBody.booking.bookingdates).toHaveProperty('checkout','2019-01-01');

})



