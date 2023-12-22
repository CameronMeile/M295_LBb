const express = require('express');
const session = require('express-session');
const { randomUUID } = require('node:crypto');
const router = express.Router();

// Middleware function for verifying authentication
function verifyAuthentication(req, res, next) {
    if (req.session.isAuthenticated === true) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

router.use(express.json());
router.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true
}));

let tasks = [
    {
        "id": randomUUID(),
        "title": "Bericht zu Ende schreiben",
        "erstellungsdatum": new Date().toISOString(),
        "erfüllungsdatum": null
    },
    {
        "id": randomUUID(),
        "title": "Lebensmittel einkaufen",
        "erstellungsdatum": new Date().toISOString(),
        "erfüllungsdatum": null
    },
    {
        "id": randomUUID(),
        "title": "Zahnarzttermin vereinbaren",
        "erstellungsdatum": new Date().toISOString(),
        "erfüllungsdatum": null
    },
    {
        "id": randomUUID(),
        "title": "Kunden für Projektupdate anrufen",
        "erstellungsdatum": new Date().toISOString(),
        "erfüllungsdatum": null
    },
    {
        "id": randomUUID(),
        "title": "Rechnungen bezahlen",
        "erstellungsdatum": new Date().toISOString(),
        "erfüllungsdatum": null
    },
    {
        "id": randomUUID(),
        "title": "Team-Meeting besuchen",
        "erstellungsdatum": new Date().toISOString(),
        "erfüllungsdatum": null
    },
    {
        "id": randomUUID(),
        "title": "Büromaterial organisieren",
        "erstellungsdatum": new Date().toISOString(),
        "erfüllungsdatum": null
    },
    {
        "id": randomUUID(),
        "title": "Neue Marketingstrategien recherchieren",
        "erstellungsdatum": new Date().toISOString(),
        "erfüllungsdatum": null
    },
    {
        "id": randomUUID(),
        "title": "Präsentation für Konferenz vorbereiten",
        "erstellungsdatum": new Date().toISOString(),
        "erfüllungsdatum": null
    },
    {
        "id": randomUUID(),
        "title": "Haus putzen",
        "erstellungsdatum": new Date().toISOString(),
        "erfüllungsdatum": null
    }
]

router.use(verifyAuthentication);

// GET /tasks Endpunkt, welcher eine Liste aller Tasks zurück gibt
router.get('/', (req, res) => {
    res.status(200).json(tasks);
    /*
    #swagger.path = '/tasks'
    #swagger.produces = ['application/json']
    #swagger.tags = ['tasks']
    #swagger.summary = 'Eine Liste aller Tasks wird zurück gegeben.'
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/tasks' }
    }  
    */
});

// POST /tasks Endpunkt, der einen neuen Task erstellt und diesen zurückgibt
router.post('/', (req, res) => {
    const newTask = req.body;
    newTask.id = randomUUID();
    newTask.author = req.session.token;
    newTask.erstellungsdatum = new Date().toISOString();
    newTask.erfüllungsdatum = null;

    tasks.push(newTask);
    res.status(201).send(newTask);
    /*
    #swagger.path = '/tasks'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json']
    #swagger.tags = ['tasks']
    #swagger.summary = 'Mit einem JSON POST Request, eine neue Task hinzufügen. '
    #swagger.responses[201] = {
        schema: { $ref: '#/definitions/tasks' }
    }  

        #swagger.parameters['body'] = {
            in: 'body',
            description: 'User data.',
            required: true,
            schema: {
                title: "New Title"
            }
        }
    */
});

// GET /tasks/{id} Endpunkt, welcher einen einzelnen Task zurück gibt
router.get('/:id', (req, res) => {    
    const taskId = req.params.id;
    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    return res.status(200).json(task);
     /*
    #swagger.path = '/tasks/{id}'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json']
    #swagger.tags = ['tasks']
    #swagger.summary = 'Eine bestehende Task via {id} ausgeben.'
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/tasks' }
    }  
    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/tasks' }
    }  

        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Task ID.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['body'] = {
            in: 'body',
            description: 'User data.',
            required: true,
            schema: {
                title: "New Title",
                password: "1234"
            }
        }
    */
});

// PATCH /task/{id} Endpunkt, welcher den bestehenden Task verändert und diesen zurück gibt
router.patch('/:id', (req, res) => {
    const taskId = req.params.id;
    const { title, erstellungsdatum, erfüllungsdatum } = req.body;
    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    task.title = title;
    task.erstellungsdatum = erstellungsdatum;
    task.erfüllungsdatum = erfüllungsdatum;

    return res.status(200).json(task);
      /*
    #swagger.path = '/tasks/{id}'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json']
    #swagger.tags = ['tasks']
    #swagger.summary = 'Mit einem JSON PATCH Request, ein bestehende Task via {id} bearbeiten.'
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/tasks' }
    }  
    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/tasks' }
    }  

        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Task ID.',
            required: true,
            type: 'string'
        }

        #swagger.parameters['body'] = {
            in: 'body',
            description: 'User data.',
            required: true,
            schema: {
                "title": "Changed Title",
                "erstellungsdatum": "2023-12-22T10:30:00.000Z",
                "erfüllungsdatum": "2023-12-31T23:59:59.000Z"
            }
        }
    */
});

// DELETE /task/{id} Endpunkt, welcher den bestehenden Task löscht
router.delete('/:id', (req, res) => {
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];
    return res.status(200).json(deletedTask);
      /*
    #swagger.path = '/tasks/{id}'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json']
    #swagger.tags = ['tasks']
    #swagger.summary = 'Mit der {id} eine bestehende Task löschen.'
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/tasks' }
    }  
    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/tasks' }
    }  

        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Task ID.',
            required: true,
            type: 'string'
        }
    */
});

module.exports = router;