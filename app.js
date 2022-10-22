var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const dbConnect = require('./models/dbConnect');

// Start database connection
dbConnect();

const app = express();
// SOLVE CORS ERROR
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


// import Routes
var usersRouter = require('./routes/users');
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login');


// import Authorization required routes
const manageRouter = require('./routes/auth/manage');
const addStaffRouter = require('./routes/auth/addStaff');
const createTimeSheet = require('./routes/auth/createTimeSheets');
const getTimesheet = require('./routes/auth/getTImesheets');
const updateTimesheet = require('./routes/auth/updateTimeSheet');
const deleteTimesheet = require('./routes/auth/deleteTimeSheet');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Routes
app.use('/register', registerRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/auth/manage', manageRouter);
app.use('/auth/addStaff', addStaffRouter);
app.use('/auth/:staffId/createtimesheet', createTimeSheet);
app.use('/auth/:staffId/gettimesheet', getTimesheet);
app.use('/auth/:staffId/updatetimesheet/:timesheetId', updateTimesheet);
app.use('/auth/:staffId/deletetimesheet/:timesheetId', deleteTimesheet);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

module.exports = app;
