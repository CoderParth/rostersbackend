const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

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


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// import Routes
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login');
const resetEmailRouter = require('./routes/passwordResetEmail');
const changePasswordRouter = require('./routes/changePassword');


// import Authorization required routes
const getStaffRouter = require('./routes/auth/getStaff');
const addStaffRouter = require('./routes/auth/addStaff');
const updateStaffRouter = require('./routes/auth/updateStaff');
const deleteStaffRouter = require('./routes/auth/deleteStaff');
const createTimeSheet = require('./routes/auth/createTimeSheets');
const getTimesheet = require('./routes/auth/getTImesheets');
const updateTimesheet = require('./routes/auth/updateTimeSheet');
const deleteTimesheet = require('./routes/auth/deleteTimeSheet');



//Routes
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/auth/getstaff', getStaffRouter);
app.use('/auth/addstaff', addStaffRouter);
app.use('/auth/updatestaff/:staffId', updateStaffRouter);
app.use('/auth/deletestaff/:staffId', deleteStaffRouter);
app.use('/auth/:staffId/createtimesheet', createTimeSheet);
app.use('/auth/:staffId/gettimesheet', getTimesheet);
app.use('/auth/:staffId/updatetimesheet/:timesheetId', updateTimesheet);
app.use('/auth/:staffId/deletetimesheet/:timesheetId', deleteTimesheet);
app.use('/passwordReset', resetEmailRouter);
app.use('/changePassword/:userId/:token', changePasswordRouter);


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
