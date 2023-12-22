const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        version: '',
        title: 'LBb Taskmanager - Cameron Meile',
        description: 'This is LBb! A Taskmanager. You can get all your tasks, edit it and delete it. But first you need to login!'
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
    ],
    definitions: {
        tasks_success: {
            type: 'object',
            properties: {
                id: "RandomUuid();",
                title: "Task_Title",
                author: "Token",
                erstellungsdatum: "date();",
                erfüllungsdatum: "null"
            }
        },
        tasksnotfound: {
            error: "Task not found"
        },
        login_success: {
            token: "RandomUuid();"
        },
        login_failed: {
            error: "Internal Server Error"
        },
        login_invalid: {
            error: 'Invalid credentials'
        },
        verify_success: {
            valid: true
        },
        verify_failed: {
            valid: false
        },
        logout_sucess: {
            message: "Logout successful"
        },
        unauthorized: {
            error: 'Unauthorized'
        }
    },
    responses: {
        200: {
            description: 'Successful response',
            schema: {
                $ref: '#/definitions/verify_success'
            }
        },
        201: {
            description: 'Successful Created',
            schema: {
                $ref: '#/definitions/tasks_success',
                $ref: '#/definitions/login_success'
            }
        },
        401: {
            description: 'Unauthorized',
            schema: {
                $ref: '#/definitions/verify_failed'
            }
        },
        404: {
            description: 'Task not Found',
            schema: {
                $ref: '#/definitions/tasksnotfound'
            }
        },
        500: {
            description: 'An error occurred during logout',
            schema: {
                $ref: '#/definitions/login_failed'
            }
        }
    }
};

const outputFile = './docs/swagger-output.json';
const routes = ['./routes/login.js', './routes/tasks.js'];

swaggerAutogen(outputFile, routes, doc);