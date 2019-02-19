const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req,res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/posts',verifyToken, (req,res) => {
    debugger;
    jwt.verify(req.token, 'shhhhhhhhhh', (err, authData) => {
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
});

app.post('/api/login', (req, res) =>{
    // Mock user
    const user = {
        id: 1,
        username: 'tamir',
        email: 'tamir@gmail.com'
    }

    jwt.sign({user}, 'shhhhhhhhhh',{expiresIn: '30m'}, (err, token) => {
        res.json({token});
    });
})

//verify Token

function verifyToken(req, res, next){
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        //Set the token
        req.token = bearerToken;
        next();
    }
    else{
        // Forbidden
        res.sendStatus(403);
    }
}

app.listen(5000, () => console.log('server started on port 5000'));
