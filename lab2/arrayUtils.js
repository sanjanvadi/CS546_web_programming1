/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
let arrayStats = (array) => {

  if (!(Array.isArray(array))) {
      throw 'not an array';
  }
  array.forEach(e => {
      if (typeof e !== 'number') {
          throw 'not a number';
      }
  });
  if (array.length <= 0) {
      throw 'array empty';
  }
  let sorted = array.sort(function(x, y) {
      return x - y;
  })
  let mean = 0;
  let sum = 0;
  let count = 0;
  let accorance = {};
  let median;
  let mode = [];

  if (array.length % 2 == 0) {
      median = (sorted[array.length / 2] + sorted[(array.length / 2) - 1]) / 2
  } else {
      median = sorted[(array.length - 1) / 2];
  }
  array.forEach(element => {
      if (accorance[element] === undefined) {
          accorance[element] = 0;
      }
      accorance[element] += 1;
      sum += element;
      count++;
  });
  let sortedObj = Object.keys(accorance).map(key => {
      return [Number(key), accorance[key]];
  })
  sortedObj = sortedObj.sort((x, y) => {
      return y[1] - x[1];
  })
  let freq = sortedObj[0][1];
  for (i = 0; i < sortedObj.length; i++) {
      if (sortedObj[i][1] == freq) {
          mode.push(sortedObj[i][0]);
      }
  }
  if (freq == 1) {
      mode = 0;
  }
  if (mode.length == 1) {
      mode = mode[0];
  }
  mean = sum / array.length;
  let range = Math.abs(sorted[0]) + Math.abs(sorted[array.length - 1]);
  let min = sorted[0];
  let max = sorted[array.length - 1];
  let res = {};
  res['mean'] = mean;
  res['median'] = median;
  res['mode'] = mode;
  res["range"] = range;
  res['minimum'] = min;
  res['maximum'] = max;
  res['count'] = count;
  res['sum'] = sum;
  return res;
};

let makeObjects = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies
  let res = {};
  if (!Array.isArray(...arrays)) {
      throw 'Error : not array';
  }
  for (i = 0; i < arrays.length; i++) {
      if (arrays[i].length != 2) {
          throw 'Error : array must have two elements';
      } else {
          let key = arrays[i][0];
          let value = arrays[i][1];
          res[key] = value;
      }
  }
  return res;
};

let commonElements = (...arrays) => {
  if (!Array.isArray(...arrays)) {
      throw 'Error : not an array';
  }
  if (arrays.length < 2) {
      throw 'Error : two or more array inputs required';
  }
  for (i = 0; i < arrays.length; i++) {
      if (arrays[i].length == 0) {
          throw 'Error : empty array';
      }
  }
  let res = [];
  let num = 0;
  for (i = 0; i < arrays[0].length; i++) {
      num = 0;
      for (j = 1; j < arrays.length; j++) {
          if (!res.includes(arrays[0][i]) && arrays[j].includes(arrays[0][i])) {
              num++;
          }
      }
      if (arrays.length - 1 == num) {
          res.push(arrays[0][i]);
      }
  }
  return res;
};

module.exports = {
  arrayStats,
  makeObjects,
  commonElements
};