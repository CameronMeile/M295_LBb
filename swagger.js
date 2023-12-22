const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        version: '',
        title: 'LBb Taskmanager - Cameron Meile',
        description: 'This is LBb! A Taskmanager. You can get all your tasks, edit it and delete it. But first you need to login!'
    },
    host: 'localhost:3000',
    basePath: '/tasks',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [                   // by default: empty Array
        {
        },
    ],
    securityDefinitions: {},  // by default: empty object
    definitions: {
        
    },          // by default: empty object
};

const outputFile = './docs/swagger-output.json';
const routes = ['./routes/login.js','./routes/tasks.js'];

swaggerAutogen(outputFile, routes, doc);