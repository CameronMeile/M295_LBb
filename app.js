const express = require('express');
const session = require('express-session');
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

app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true
}));

// POST /login Endpunkt, welcher die Credentials entgegennimmt, überprüft und ein Token oder Cookie zurück gibt
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the credentials are valid
    if (email && password && password === 'm295') {
        // Store the user's authentication status in the session
        req.session.isAuthenticated = true;

        // Generate a token (if needed) and store it in the session or any other required data
        req.session.token = randomUUID();

        // Return a JSON response with the token or any other relevant data
        res.status(200).json({
            message: 'Login successful',
            token: req.session.token
        });
    } else {
        // Invalid credentials
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Server Listens on PORT:3000
app.listen(port, () => {
    console.log('Server is running on port 3000');
});