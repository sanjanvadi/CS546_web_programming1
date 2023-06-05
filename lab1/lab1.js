function questionOne(arr) {
    // TODO: Implement question 1 here
    function isPrime(num) {
        let prime = true;
        if(num < 0){
            prime = false;
        }
        else if (num === 1 || num === 0) {
            prime = false;
        } else {
            for (let i = 2; i < num; i++) {
                if (num % i == 0) {
                    prime = false;
                    break;
                }
            }
        }
        return prime;
    }
    let result = arr.map(isPrime)
    return result
}

function questionTwo(startingNumber, commonRatio, numberOfTerms) {
    // TODO: Implement question 2 here
    let result = 0;
    if (startingNumber === 0 || commonRatio === 0) {
        return 0;
    } else if (numberOfTerms <= 0 || numberOfTerms % 1 != 0) {
        return NaN;
    } else {
        for (i = 0; i < numberOfTerms; i++) {
            result = result + startingNumber;
            startingNumber = startingNumber * commonRatio;
        }
        return result;
    }
}

function questionThree(str) {
    // TODO: Implement question 3 here
    let regex = /[BCDFGJKLMNPQSTVXZHRWY]/gi;
    let count = 0;
    for (i = 0; i < str.length; i++) {
        let isConsonant = str.charAt(i).match(regex);
        if (isConsonant) {
            count++;
        }
    }
    return count;
}

function questionFour(fullString, substring) {
    // TODO: Implement question 4 here
    return fullString.toLowerCase().split(substring.toLowerCase()).length - 1;
}

//TODO:  Change the values for firstName, lastName and studentId
module.exports = {
    firstName: 'SANJAN ANILKUMAR',
    lastName: 'VADI',
    studentId: '20015847',
    questionOne,
    questionTwo,
    questionThree,
    questionFour,
};