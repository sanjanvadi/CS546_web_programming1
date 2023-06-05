const axios = require('axios').default;

async function getPeople() {
    let people = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json')
    return people // this will be the array of people objects
}
async function getCompany() {
    let company = await axios.get('https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json')
    return company // this will be the array of people objects
}

function checkIdOrJobTitle(id) {
    if (typeof id !== 'string') {
        throw "Error : input is not a string"
    }
    if (id.trim().length <= 0) {
        throw "Error : empty string input"
    }
}

const listEmployees = async (companyName) => {
    checkIdOrJobTitle(companyName);
    companyName = companyName.toString().trim();
    let company = await getCompany();
    let people = await getPeople();
    company = company.data;
    people = people.data
    let obj = {};
    let arr = [];
    let flag = true
    company.forEach(element => {
        if (element.name == companyName) {
            obj = element;
            flag = false;
        }
    });
    if (flag) {
        throw "Error : company not found"
    }
    people.forEach(element => {
        if (element.company_id == obj.id) {
            arr.push(element.first_name + " " + element.last_name);
        }
    });
    arr = arr.sort((first, last) => {
        last.split(' ')[1].localeCompare(first.split(' ')[1])
    }).reverse();
    // console.log(arr.reverse());
    obj["employees"] = arr;
    return obj;
};

const sameIndustry = async (industry) => {
    checkIdOrJobTitle(industry);
    industry = industry.toString().trim();
    let arr = [];
    let company = await getCompany();
    company = company.data;
    company.forEach(element => {
        if (element.industry.toString().toLowerCase() == industry.toLowerCase()) {
            arr.push(element);
        }
    });
    if (arr.length == 0) {
        throw "Error : no company found for the specified industry"
    }
    return arr;
};

const getCompanyById = async (id) => {
    checkIdOrJobTitle(id);
    id = id.toString().trim();
    let obj = {};
    let flag = true;
    let company = await getCompany();
    company = company.data;
    company.forEach(element => {
        if (element.id == id) {
            obj = element;
            flag = false;
        }
    });
    if (flag) {
        throw "Error : company not found";
    }
    return obj;
};

module.exports = {
    listEmployees,
    sameIndustry,
    getCompanyById
};