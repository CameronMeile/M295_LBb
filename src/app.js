const express = require('express');
const session = require('express-session');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger-output.json');
const { randomUUID } = require('node:crypto');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/docs', (req, res) => {
    res.sendFile('/docs/swagger-output.json');
});

// Session middleware
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true
}));

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// The tasks router module
const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

// The tasks router module
const loginRouter = require('./routes/login');
app.use('/', loginRouter);

app.get('/500', (req, res, next) => {
    // Simulating an error by throwing an exception
    throw new Error('Something went wrong');
});

// Handle requests to non-existent endpoints
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Server Listens on PORT:3000
app.listen(port, () => {
    console.log('Server is running on port 3000');
});