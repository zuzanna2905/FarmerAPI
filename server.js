const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const cors = require('cors');
const app = express();
const signin = require('./controlers/signin');
const register = require('./controlers/register');
const profile = require('./controlers/profile');
const deleteRecord = require('./controlers/delete');
const data = require('./controlers/data');
const field = require('./controlers/newfield');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'susan',
        password : 'test',
        database : 'farmer'
    }
});

app.use(bodyParser.json());
app.use(cors());

app.post('/signin', signin.handleSignin(db,bcrypt));
app.post('/register', register.handleRegister(db,bcrypt));
app.get('/profile/:id', profile.handleProfile(db));
app.post('/fields', data.handleData(db));
app.post('/fields', field.handleNewField(db));
app.delete('/fields/:id', deleteRecord.handleDelete(db));

app.listen(3001 || process.env.PORT, ()=>{
    console.log(`app is running on port  ${process.env.PORT}`);
})