/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
let deepEquality = (obj1, obj2) => {

      if (Array.isArray(obj1) || Array.isArray(obj2)) {
          throw 'not an object';
      }
      if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
          throw 'not an object';
      }
      return objectEquality(obj1, obj2);
  
      function noOfKeys(obj) {
          let count = 0;
          for (key in obj) {
              count++;
          }
          return count;
      };
  
      function objectEquality(obj1, obj2) {
          if (typeof obj1 === 'object' && typeof obj2 === 'object') {
              if (noOfKeys(obj1) !== noOfKeys(obj2)) {
                  return false;
              }
              let rec = true;
              for (key in obj1) {
                  rec = objectEquality(obj1[key], obj2[key]);
                  if (!rec) {
                      return false;
                  }
              }
              return true;
          } else {
              return obj1 === obj2;
          }
      }
  };
  
  let commonKeysValues = (obj1, obj2) => {
      if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || Array.isArray(obj1) || Array.isArray(obj2)) {
          throw 'not objects';
      }
      let res = {};
      let obj = {};
      let count = 1;
      common(obj1, obj2);
  
      function common(obj1, obj2) {
          if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
              count--;
              if (count == 0 && obj1 == obj2) {
                  Object.assign(res, obj);
                  obj = {};
              }
              if (obj1 != obj2) obj = {};
              return;
          }
          for (key in obj1) {
              if (key in obj2) {
                  let resKey = key;
                  obj[resKey] = obj1[key];
                  if (typeof obj1[key] === 'object' || typeof obj2[key] === 'object') {
                      if (Object.keys(obj1[key]).length == Object.keys(obj2[key]).length) {
                          count = Object.keys(obj1[key]).length;
                          common(obj1[key], obj2[key]);
                      } else obj = {};
                  } else {
                      common(obj1[key], obj2[key]);
                      
                  }
              } else obj = {};
          }
      }
      return res;
  };
  
  let calculateObject = (object, func) => {
      if (Array.isArray(object) || typeof object !== 'object' || typeof func !== 'function') {
          throw 'Error : Invalid arguments';
      }
      const res = {};
      for (key in object) {
          if (typeof object[key] === 'number') {
              let y = func(object[key]);
              y = Math.sqrt(y).toFixed(2);
              res[key] = y;
          } else {
              throw 'Error: Invalid object properties';
          }
      }
      return res;
  };
  
  module.exports = {
      deepEquality,
      commonKeysValues,
      calculateObject
  };