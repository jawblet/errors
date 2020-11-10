const express = require('express'); 
const morgan = require('morgan');
const cors = require('cors');
const authRouter = require('./routers/authRouter');
const AppError = require('./utils/AppError');
const errorController = require('./controllers/errorController');

const app = express();
app.use(cors());
app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth/', authRouter);

app.use(errorController); 

module.exports = app; 




/*
app.use('/', (req, res, next) => {
    console.log('you hit the middleware stack');
    next();
})

app.all('*', (req, res, next) => {
   next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

 */