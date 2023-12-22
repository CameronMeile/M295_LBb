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
    tags: [
        {
        },
    ],
    definitions: {
        tasks: {
            type: 'object',
            properties: {
                id: {
                    type: 'string'
                },
                title: {
                    type: 'string'
                },
                author: {
                    type: 'string'
                },
                erstellungsdatum: {
                    type: 'string',
                    format: 'date-time'
                },
                erfüllungsdatum: {
                    type: 'string',
                    format: 'date-time'
                }
            }
        }
    },
    responses: {
        200: {
            description: 'Successful response',
            schema: {
                $ref: '#/definitions/tasks200',
                $ref: '#/definitions/login200'
            }
        },
        201: {
            description: 'Successful Created',
            schema: {
                $ref: '#/definitions/tasks201',
                $ref: '#/definitions/login201'
            }
        },
        401: {
            description: 'Unauthorized',
            schema: {
                $ref: '#/definitions/login401'
            }
        },
        404: {
            description: 'Task not Found',
            schema: {
                $ref: '#/definitions/tasks404',
                $ref: '#/definitions/login404'
            }
        },
        500: {
            description: 'An error occurred during logout',
            schema: {
                $ref: '#/definitions/login500'
            }
        }
    }
};

const outputFile = './docs/swagger-output.json';
const routes = ['./routes/login.js', './routes/tasks.js'];

swaggerAutogen(outputFile, routes, doc);