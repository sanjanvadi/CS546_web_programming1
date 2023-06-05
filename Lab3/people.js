const axios = require('axios').default;
async function getPeople() {
    let people = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json')
    return people // this will be the array of people objects
}

function checkCityAndState(city, state) {
    if (typeof city !== 'string' && typeof state !== 'string') {
        throw "Error : input is not a string"
    }
    if (city.trim().length <= 0 || state.trim().length <= 0) {
        throw "Error : empty string input"
    }
}

function checkIdOrJobTitle(id) {
    if (typeof id !== 'string') {
        throw "Error : input is not a string"
    }
    if (id.trim().length <= 0) {
        throw "Error : empty string input"
    }
}

const getPersonById = async (id) => {
    checkIdOrJobTitle(id);
    id = id.toString().trim();
    let people = await getPeople();
    let obj = {};
    let flag = true;
    people.data.forEach(element => {
        if (element.id == id) {
            obj = element;
            flag = false;
        }
    });
    if (flag) {
        throw "Error : Person not found"
    }
    return obj;

};

const sameJobTitle = async (jobTitle) => {
    checkIdOrJobTitle(jobTitle);
    jobTitle = jobTitle.toString().trim();
    let people = await getPeople();
    let res = [];
    people.data.forEach(element => {
        if (element.job_title.toString().toLowerCase() == jobTitle.toLowerCase()) {
            res.push(element);
        }
    });
    if (res.length < 2) {
        throw "Error : less than two people have the same job title"
    }
    return res;
};

const getPostalCodes = async (city, state) => {
    checkCityAndState(city, state)
    city = city.toString().trim();
    state = state.toString().trim();
    let res = [];
    let people = await getPeople();
    people.data.forEach(element => {
        if (element.city.toString().toLowerCase() == city.toLowerCase() && element.state.toString().toLowerCase() == state.toLowerCase()) {
            if (element.postal_code == null) {
                throw "Error : no postal code for given city and state"
            }
            res.push(parseInt(element.postal_code));
        }
    });
    if (res.length == 0) {
        throw "Error : There are no postal_codes for the given city and state combination"
    }
    res.sort((x, y) => {
        return x - y;
    })
    return res;
};

const sameCityAndState = async (city, state) => {
    checkCityAndState(city, state);
    city = city.toString().trim();
    state = state.toString().trim();
    let res = [];
    let people = await getPeople();
    people.data.forEach(element => {
        if (element.city.toString().toLowerCase() == city.toLowerCase() && element.state.toString().toLowerCase() == state.toLowerCase()) {
            res.push(element.first_name + " " + element.last_name);
        }
    });
    if (res.length < 2) {
        throw "Error : there are no two people who live in the same city and state"
    }
    res = res.sort((first, last) => last.split(' ')[1].localeCompare(first.split(' ')[1])).reverse()
    return res;
};

module.exports = {
    getPersonById,
    sameJobTitle,
    getPostalCodes,
    sameCityAndState
};