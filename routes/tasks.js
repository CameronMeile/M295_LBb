const express = require('express');
const session = require('express-session');
const { randomUUID } = require('node:crypto');
const router = express.Router();

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

// ENDPUNKTE

// GET /tasks Endpunkt, welcher eine Liste aller Tasks zurück gibt
router.get('/', (req, res) => {
    res.status(200).json(tasks);
});

// POST /tasks Endpunkt, der einen neuen Task erstellt und diesen zurückgibt
router.post('/', (req, res) => {    

    const newTask = req.body;
    newTask.id = randomUUID();
    newTask.erstellungsdatum = new Date().toISOString();
    newTask.erfüllungsdatum = null;

    tasks.push(newTask);
    res.status(201).send(newTask);
});

// Example request body:
// {
// "title": "New Task /POST"
// }

// GET /tasks/{id} Endpunkt, welcher einen einzelnen Task zurück gibt
router.get('/:id', (req, res) => {
    const taskId = req.params.id;

    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    return res.status(200).json(task);
});

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
});

// Example request body:
// {
// "title": "Changed Title",
// "erstellungsdatum": "2023-12-22T10:30:00.000Z",
// "erfüllungsdatum": "2023-12-31T23:59:59.000Z"
// }

router.delete('/:id', (req, res) => {
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];
    return res.status(200).json(deletedTask);
});

module.exports = router;