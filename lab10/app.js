// Setup server, session and middleware here.
const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const session = require('express-session');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}));

app.use('/protected', (req, res, next) => {
  if (!req.session.user) {
    userData = new Date().toUTCString() + ": "+req.method+" "+req.originalUrl+" (Non-Authenticated User)";
    console.log(userData);
    return res.status(403).render('forbiddenAccess',{title:"Forbidden",error:"user is not logged in"});
  } else {
    userData = new Date().toUTCString() + ": "+req.method+" "+req.originalUrl+" (Authenticated User)"
    console.log(userData);
    next();
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});