# SetUp Guide

1. Erstellen Sie eine Kopie (fork) von diesem Projekt.
2. Stellen Sie sicher, dass Docker installiert ist und läuft.
3. Erstellen Sie einen Dev Container, um dieses Projket zu runnen.

4. Führen Sie folgende Schritte aus, nachdem Ihr Container gestartet hat.
```
npm init
```
5. Dependencies to Install
- npm i express
- npm i express-session
- npm i swagger-ui-express
- npm i swagger-autogen
- npm i crypto
- npm i nodemon (optional)
  
### All in One
```
npm i express express-session swagger-ui-express swagger-autogen crypto nodemon
```

6. Go into your package.json and replace the script section with this code
```json
"scripts": {
    "dev": "nodemon ./src/app.js",
    "swagger": "node ./swagger.js"
  },
```

7. Run your application
```
npm run dev
```

8. (optinal) before running the application, you can reload the docu for a up to date version
```
npm run swagger
```

# Important Redirections
- [Click here for Testing](/testing/README.md)
- [Click here for Docs](/docs/)
- [Click here to see src code](/src/)
- [Click here to see the log](/log/)