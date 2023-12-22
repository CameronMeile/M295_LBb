const express = require('express');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
const app = express();
const port = 3000;
app.use(express.json());
const { randomUUID } = require('node:crypto');

// const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

// const doc = {
//   info: {
//     version: '',            // by default: '1.0.0'
//     title: '',              // by default: 'REST API'
//     description: ''         // by default: ''
//   },
//   servers: [
//     {
//       url: '',              // by default: 'http://localhost:3000'
//       description: ''       // by default: ''
//     },
//     // { ... }
//   ],
//   tags: [                   // by default: empty Array
//     {
//       name: '',             // Tag name
//       description: ''       // Tag description
//     },
//     // { ... }
//   ],
//   components: {}            // by default: empty object
// };

// const outputFile = './swagger-output.json';
// const routes = ['./path/userRoutes.js', './path/bookRoutes.js'];

// swaggerAutogen(outputFile, routes, doc);

// const outputFile = './swagger-output.json';
// const routes = ['./path/userRoutes.js', './path/bookRoutes.js'];
// swaggerAutogen(outputFile, routes, doc);

// app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.get('/swagger-ui', (req, res) => {
//   res.sendFile('/swagger-output.json');
// });

const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

// Server Listens on PORT:3000
app.listen(port, () => {
    console.log('Server is running on port 3000');
});