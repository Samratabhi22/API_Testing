//Load Playwright Module
const {test,expect} = require('@playwright/test')
//Write Test
test('Create POST api request using static request body',async({request})=>{
    //Create POST api request
const postResponse = await request.post('/booking',{
    data:{
    "firstname": "Abhishek",
    "lastname": "Kumar",
    "totalprice": 1000,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2018-01-01",
        "checkout": "2019-01-01"
    },
    "additionalneeds": "super bowls"
    }
})
const postResponseBody = await postResponse.json();
console.log(postResponseBody)

//validate status code 
await expect(postResponse).toBeOK();
await expect(postResponse.status()).toBe(200);

//Validate JSON api response 
await expect(postResponseBody.booking).toHaveProperty('firstname','Abhishek');
await expect(postResponseBody.booking).toHaveProperty('lastname','Kumar');


//validate nested JSON objects

})



