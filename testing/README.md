# Testing

- JSON-FILE for testing -> [testing.json](/testing/testing.json)


# Manual Testing

Just Copy / Paste these Commands in your CMD

```
// Login
curl -X 'POST' \
  'http://localhost:3000/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "example@example.com",
  "password": "m295"
}'

// Verify
curl -X 'GET' \
  'http://localhost:3000/verify' \
  -H 'accept: application/json'

// Logout
curl -X 'GET' \
  'http://localhost:3000/verify' \
  -H 'accept: application/json'

// All Tasks (only works if loged in)
curl -X 'GET' \
  'http://localhost:3000/tasks' \
  -H 'accept: application/json'

// Add new Task (only works if loged in)
  curl -X 'POST' \
  'http://localhost:3000/tasks' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "title": "New Title"
}'

// Specific Task (only works if loged in)
// {taskID} needs a current used Task ID
curl -X 'GET' \
  'http://localhost:3000/tasks/{taskID}' \
  -H 'accept: application/json'

// Update a Task (only works if loged in)
// {taskID} needs a current used Task ID
curl -X 'PATCH' \
  'http://localhost:3000/tasks/{taskID}' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "title": "Changed Title",
  "erstellungsdatum": "2023-12-22T10:30:00.000Z",
  "erfüllungsdatum": "2023-12-31T23:59:59.000Z"
}'

// Delete a Task (only works if loged in)
// {taskID} needs a current used Task ID
curl -X 'DELETE' \
  'http://localhost:3000/tasks/{taskID}' \
  -H 'accept: application/json'
```