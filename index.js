const express = require('express');
const cors = require('cors')
const env = require('dotenv').config();
const app = express();
app.use(cors());
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

app.listen(ports, () => console.log(`Listening on port ${ports}`) )