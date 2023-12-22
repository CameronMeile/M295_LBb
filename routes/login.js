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

// POST /login Endpunkt, welcher die Credentials entgegennimmt, überprüft und ein Token oder Cookie zurück gibt
router.post('/login', (req, res) => {
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
    /*
   #swagger.consumes = ['application/json']
   #swagger.tags = ['login']
   #swagger.summary = 'Login und generiert AUTH-Token'
   #swagger.responses[200] = {
       schema: { $ref: '#/definitions/login_success' }
   }  
   #swagger.responses[401] = {
       schema: { $ref: '#/definitions/login_invalid' }
   }  
   #swagger.parameters['body'] = {
            in: 'body',
            description: 'User data.',
            required: true,
            schema: {
                "email": "example@example.com",
                "password": "m295"
            }
        }
   */
});

//  GET /verify Endpunkt, welcher ein Token oder Cookie auf Gültigkeit überprüft und das Ergebnis zurück gibt
router.get('/verify', (req, res) => {
    // Check if the user is authenticated in the session
    if (req.session.isAuthenticated === true) {
        // User is authenticated
        res.status(200).json({ valid: true });
    } else {
        // User is not authenticated
        res.status(401).json({ valid: false });
    }

    /*
    #swagger.consumes = ['application/json']
    #swagger.tags = ['login']
    #swagger.summary = 'Prüft den AUTH-Token'
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/verify_success' }
    }  
    #swagger.responses[401] = {
        schema: { $ref: '#/definitions/verify_failed' }
    }  
*/
});

// DELETE /logout Endpunkt, welcher das mitgegeben Token oder Cookie als ungültig markiert
router.delete('/logout', (req, res) => {
    // Destroy the session to log the user out
    req.session.destroy((error) => {
        if (error) {
            console.error('Error destroying session:', error);
            res.status(500).json({ error: 'An error occurred during logout' });
        } else {
            res.status(200).json({ message: 'Logout successful' });
        }
    });
    /*
    #swagger.consumes = ['application/json']
    #swagger.tags = ['login']
    #swagger.summary = 'Login und generiert AUTH-Token'
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/logout_sucess' }
    }  
    #swagger.responses[500] = {
        schema: { $ref: '#/definitions/login_failed' }
    }  
    */
});

module.exports = router;