const express = require('express');
// const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const cors = require('cors')
const app = express();
app.use(cors());
const db = require('./util/database')
const authRoutes = express.Router();
const ports = process.env.PORT || 3000;

app.use(express.json());
// app.use(express.urlencoded());



// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Header', 'Content-type, Authorization');
//     next();
// });


app.use('/auth', require('./routes/auth'));
// app.use('/auth', require('./routes/auth'))
// require('./routes/auth')(db, authRoutes, jwt);

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })


app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
  })

app.listen(ports, () => console.log(`Listening on port ${ports}`) )