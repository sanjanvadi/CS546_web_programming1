/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
let palindromes = (string) => {
      if (typeof string !== 'string') {
          throw 'not a string';
      }
      if (!string) {
          throw 'string empty';
      }
      if (string.trim().length <= 0) {
          throw 'invalid string';
      }
      let result = [];
      let array = string.replace(/[^a-z\s]/gi, '').split(' ');
      array.forEach(element => {
          let e = element.toLowerCase();
          let reverse = e.split('').reverse().join('');
          if (e == reverse) {
              result.push(element);
          }
      });
      return result;
  };
  
  let replaceChar = (string) => {
      if (typeof string !== 'string') {
          throw 'not a string';
      }
      if (!string) {
          throw 'string empty';
      }
      if (string.trim().length <= 0) {
          throw 'invalid string';
      }
      let alternate = true;
      let str = string.split('');
      for (i = 0; i < string.length; i++) {
          if (i % 2 == 1) {
              if (alternate) {
                  str[i] = '*';
                  alternate = false;
              } else {
                  str[i] = '$';
                  alternate = true;
              }
          }
      }
      str = str.join('');
      return str;
  };
  
  let charSwap = (string1, string2) => {
      if (typeof string1 !== 'string' || typeof string2 !== 'string') {
          throw 'not a string';
      }
      if (!string1 || !string2) {
          throw 'string empty';
      }
      if (string1.trim().length < 4 || string2.trim().length < 4) {
          throw 'invalid string';
      }
      let str1 = string1.substring(0, 4);
      let str2 = string1.substring(4, string1.length);
      let str3 = string2.substring(0, 4);
      let str4 = string2.substring(4, string2.length);
  
      let res1 = str3 + str2 + ' ' + str1 + str4;
      return res1;
  };
  
  module.exports = {
      palindromes,
      replaceChar,
      charSwap
  };