/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.
*/
const people = require("./people");
const company = require("./companies");

async function main() {

    // try {
    //     const peopledata1 = await people.getPersonById("fa36544d-bf92-4ed6-aa84-7085c6cb0440");
    //     console.log(peopledata1);
    // } catch (e) {
    //     console.log(e);
    // }
    // try {
    //     const peopledata1 = await people.getPersonById("     ");
    //     console.log(peopledata1);
    // } catch (e) {
    //     console.log(e);
    // }

    // try {
    //     const peopledata2 = await people.sameJobTitle("Help Desk Operator");
    //     console.log(peopledata2);
    // } catch (e) {
    //     console.log(e);
    // }
    // try {
    //     const peopledata2 = await people.sameJobTitle(1234);
    //     console.log(peopledata2);
    // } catch (e) {
    //     console.log(e);
    // }

    // try {
    //     const peopledata2 = await people.getPostalCodes("AusTin", "teXas"); // Throws Error: There are no postal_codes for the given city and state combination
    //     console.log(peopledata2);
    // } catch (e) {
    //     console.log(e);
    // }
    // try {
    //     const peopledata2 = await people.getPostalCodes("Bayside", "New York"); // Throws Error: There are no postal_codes for the given city and state combination
    //     console.log(peopledata2);
    // } catch (e) {
    //     console.log(e);
    // }
    // try {
    //     const peopledata2 = await people.sameCityAndState("Salt Lake City", "Utah"); // Returns: ['Vonnie Faichney', 'Townie Sandey',  'Eolande Slafford']        
    //     console.log(peopledata2);
    // } catch (e) {
    //     console.log(e);
    // }
    // try {
    //     const peopledata2 = await people.sameCityAndState("bayside", "new york"); // Returns: ['Vonnie Faichney', 'Townie Sandey',  'Eolande Slafford']        
    //     console.log(peopledata2);
    // } catch (e) {
    //     console.log(e);
    // }

    // try {
    //     const peopledata2 = await company.listEmployees("Yost, Harris and Cormier"); // Returns: ['Vonnie Faichney', 'Townie Sandey',  'Eolande Slafford']        
    //     console.log(peopledata2);
    // } catch (e) {
    //     console.log(e);
    // }
    try {
        const peopledata2 = await company.listEmployees("Dach-Pacocha"); // Returns: ['Vonnie Faichney', 'Townie Sandey',  'Eolande Slafford']        
        console.log(peopledata2);
    } catch (e) {
        console.log(e);
    }

    // try {
    //     const peopledata2 = await company.sameIndustry('auto Parts:O.E.M.'); // Returns: ['Vonnie Faichney', 'Townie Sandey',  'Eolande Slafford']        
    //     console.log(peopledata2);
    // } catch (e) {
    //     console.log(e);
    // }
    // try {
    //     const peopledata2 = await company.sameIndustry('   '); // Returns: ['Vonnie Faichney', 'Townie Sandey',  'Eolande Slafford']        
    //     console.log(peopledata2);
    // } catch (e) {
    //     console.log(e);
    // }
    // try {
    //     const peopledata2 = await company.getCompanyById("fb90892a-f7b9-4687-b497-d3b4606faddf");
    //     console.log(peopledata2);
    // } catch (e) {
    //     console.log(e);
    // }
    // try {
    //     const peopledata2 = await company.getCompanyById("fb90892a-f7b9-4687-b497-d3b4606faddfa");
    //     console.log(peopledata2);
    // } catch (e) {
    //     console.log(e);
    // }
}

//call main
main();