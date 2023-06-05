//Here you will require route files and export them as used in previous labs.
const sort = require('./sortArray');

const constructorMethod = (app) => {
  app.use('/', sort);
  
  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;