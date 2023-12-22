# SetUp Guide

1. 
```
npm init
```

2. 
### Dependencies to Install
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

3. Go into your package.json and replace the script section with this code
```json
"scripts": {
    "dev": "nodemon ./src/app.js",
    "swagger": "node ./swagger.js"
  },
```

4. Run your application
```
npm run dev
```

5. (optinal) before running the application, you can reload the docu for a up to date version
```
npm run swagger
```

# Important Redirections
- [Click here for Testing](/testing/README.md)
- [Click here for Docs](/docs/)
- [Click here to see src code](/src/)
- [Click here to see the log](/log/)