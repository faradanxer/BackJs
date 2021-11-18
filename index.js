//Imports
const express = require('express');
const http = require('http');
const cors = require('cors');
const apiToDosRouter = require('./controllers/api-todos.controller');
const apiAuthRouter = require('./controllers/api-auth.controller');
const testRouter = require('./controllers/test.controller');
const { notFound, errorHandler, asyncHandler } = require('./middlewares/middlewares');
const { initDB } = require('./dataBase');

//Init zone
const app = express();

//InitDB
initDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log('URL = ', req.url);
  console.log('Original_URL = ', req.originalUrl);
  console.log('METHOD = ', req.method);
  console.log('HOST = ', req.headers.host);
  console.log('IsSecure = ', req.secure);
  console.log('BODY', req.body);
  console.log('QUERY', req.query);

  next();
});

app.use('/api/todos', apiToDosRouter);
app.use('/api/auth', apiAuthRouter);
app.use('/test', testRouter);

app.use(notFound);
app.use(errorHandler);

//Create server
http.createServer(app).listen(3000, () => {
  console.log('Server is working on port 3000');
});

// const express = require('express');
// const http = require('http');
// const cors = require('cors');
// const { read } = require('fs');

// const app = express();

// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use((req, res, next) => {
//   console.log('URL = ', req.url);
//   console.log('Original_URL = ', req.originalUrl);
//   console.log('METHOD = ', req.method);
//   console.log('HOST = ', req.headers.host);
//   console.log('IsSecure = ', req.secure);
//   console.log('BODY', req.body);
//   console.log('QUERY', req.query);

//   next();
// });

// app.all('/test', (req, res) => {
//   res.status(200).json({ message: 'OK'});
// })

// app.post('/sum',(req,res) =>{
//     let sum= req.body.a+req.body.b;
//     res.status(200).json({sum})
// })
// app.post('/reverseCase',(req,res)=>{
//     let str=req.body.a;
//     let str2='';
//     for (let i = 0; i < str.length; i++) {
//         if (str.charAt(i) == str.charAt(i).toLowerCase()) {
//             str2 += str.charAt(i).toUpperCase();
//         } else if (str.charAt(i) == str.charAt(i).toUpperCase()) {
//             str2 += str.charAt(i).toLowerCase()
//         } else {
//             str2 += str.charAt(i);
//         }
//     }
//     res.status(200).json({str2})
// })
// app.post('/reverseArray',(req,res)=>{
//     let str=req.body.a;
//     let str2=str.reverse();
//     res.status(200).json({str2})
// })
// http.createServer(app).listen(3000, () => {
//   console.log('Server is working on port 3000');
// })