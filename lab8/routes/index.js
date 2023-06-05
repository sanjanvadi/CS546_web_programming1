//Here you will require route files and export them as used in previous labs
const peopleRoutes = require('./people');
const path = require('path');

const constructorMethod = (app) => {
  app.use('/', peopleRoutes);
  
  app.use('*', (req, res) => {
    const people={
      title:"Page Not Found"
    }
    res.status(404).render('error',{people:people,url:"404 : Page Not Found"});
  });
};

module.exports = constructorMethod;