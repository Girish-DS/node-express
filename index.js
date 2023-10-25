const express = require('express');
const cors = require('cors')
const env = require('dotenv').config();
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const ports = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Sample API with swagger",
            description: "This is a sample API to demonstrate Swagger integration with Express.js",
            termsOfService: "http://example.com/terms/",
            contact: {
              name: "API Support",
              url: "http://www.example.com/support",
              email: "support@example.com"
            },
            license: {
              name: "Apache 2.0",
              url: "https://www.apache.org/licenses/LICENSE-2.0.html"
            },
            version: "1.0.0"
        },
        server: [
            {
                url: `http://localhost:${ports}`,
            }
        ]
    },
    apis: ["./routes*.js"] //Path to API routes directory
}

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

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

app.listen(ports, () => console.log(`Listening on port ${ports}`))