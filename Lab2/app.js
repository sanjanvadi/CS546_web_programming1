/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
const stringUtils = require('./stringUtils');
const arrayUtils = require('./arrayUtils');
const objectUtils = require('./objectUtils');
try {
    console.log(arrayUtils.arrayStats([9, 15, 25.5, -5, 5, 7, 10, 5, 11, 30, 4, 1, -20])); // Returns: { mean: 7.5, median: 7, mode: 5, range: 50, minimum: -20, maximum: 30, count: 13, sum: 97.5 }
} catch (e) {
    console.error(e);
}

try {
    console.error(arrayUtils.arrayStats([])); // throws an error 
} catch (e) {
    console.log(e);
}

try {
    console.log(arrayUtils.makeObjects([4, 1], [1, 2])); // returns {'4':1, '1': 2}
} catch (e) {
    console.error(e);
}

try {
    console.error(arrayUtils.makeObjects([4, 1, 2], [1, 2])); // throws error
} catch (e) {
    console.log(e);
}

const arr1 = [5, 7];
const arr2 = [20, 5];
const arr3 = [true, 5, 'Patrick'];
const arr4 = ["CS-546", 'Patrick'];
const arr5 = [67.7, 'Patrick', true];
const arr6 = [true, 5, 'Patrick'];
const arr7 = [undefined, 5, 'Patrick'];
const arr8 = [null, undefined, true];
const arr9 = ["2D case", ["foo", "bar"], "bye bye"]
const arr10 = [["foo", "bar"], true, "String", 10]

try {
    console.log(arrayUtils.commonElements(arr3, arr4, arr5)); // returns ['Patrick']
} catch (e) {
    console.error(e);
}
try {
    console.error(arrayUtils.commonElements("test")); // throws error
} catch (e) {
    console.log(e);
}

try {
    console.log(stringUtils.palindromes('Hi mom, At noon, Im going to take my kayak to the lake')); // Returns: ["mom", "noon", "kayak"]
} catch (e) {
    console.error(e);
}
try {
    console.error(stringUtils.palindromes()); // throws error
} catch (e) {
    console.log(e);
}

try {
    console.log(stringUtils.replaceChar("Hello, How are you? I hope you are well"));
} catch (e) {
    console.error(e);
}
try {
    console.error(stringUtils.replaceChar(12345)); // throws error
} catch (e) {
    console.log(e);
}
try {
    console.log(stringUtils.charSwap("Patrick", "Hill"));
} catch (e) {
    console.error(e);
}
try {
    console.error(stringUtils.charSwap(12345, 67890)); // throws error
} catch (e) {
    console.log(e);
}

const first = {a: 2,b: 3};
const second = {a: 2,b: 4};

try {
    console.log(objectUtils.deepEquality(first, second)); // false
} catch (e) {
    console.error(e);
}
try {
    console.error(objectUtils.deepEquality([1, 2, 3], [1, 2, 3])); // throws error
} catch (e) {
    console.log(e);
}

const third = {a: 2,b: {c: true,d: false}};
const forth = {b: {c: true,d: false},foo: "bar"};
try {
    console.log(objectUtils.commonKeysValues(first, second)); // returns  {name: {first: "Patrick", last: "Hill"}, first: "Patrick", last: "Hill"} 
} catch (e) {
    console.error(e);
}
try {
    console.error(objectUtils.commonKeysValues([1, 2, 3], [1, 2, 3])); // throws error
} catch (e) {
    console.log(e);
}

try {
    console.log(objectUtils.calculateObject({a: 3,b: 7,c: 5}, n => n * 2));
} catch (e) {
    console.error(e);
}
try {
    console.error(objectUtils.calculateObject({a: 3,b: 7,c: 5}, 'string')); // throws error
} catch (e) {
    console.log(e);
}