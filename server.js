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

let database = {
    users: [
        {
            id: '123',
            name: 'John',
            password: 'cookies',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            password: 'bananas',
            email: 'sally@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ],
    fields : [
        {
            id: '1',
            number: '100',
            area: '12.5',
            soil: 'black',
            soilclass: '2',
            userid: '1'
        },
        {
            id: '2',
            number: '102',
            area: '10',
            soil: 'black',
            soilclass: '2',
            userid: '124'
        },
        {
            id: '3',
            number: '103',
            area: '4',
            soil: 'brown',
            soilclass: '1',
            userid: '1'
        },
        {
            id: '4',
            number: '104',
            area: '1.25',
            soil: 'brown',
            soilclass: '1',
            userid: '124'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database);
})

app.post('/signin', signin.handleSignin(db,bcrypt));
app.post('/register', register.handleRegister(db,bcrypt));
app.get('/profile/:id', profile.handleProfile(db));
//app.delete('/field/:id', deleteRecord.handleDelete());

app.delete('/field/:id', (req,res) => {
    let i = 0;
    database.fields.forEach(field => {
        if (field.id === req.params.id) {
            i = database.fields.indexOf(field);
            database.fields.splice(i,1);
            return res.json({ message: 'ok' });
        }
    }), function (err) {
        if (err) return res.send(err);
    }
    res.json({ message: 'no data' });
})

app.post('/data', (req, res) => {
    let data = [];
    let number = 0;
    const { id } = req.body;
    database.fields.forEach(field => {
        if (field.userid === id) {
            data[number] = field;
            number++;
        }
    })
    if(data !== -1){
        return res.json(data);
    }
    res.status(400).json('not found');
})

app.post('/newfield', (req,res) => {
    const { number, area, soil, soilclass, userid } = req.body;
    database.fields.push({
        id: '5',
        number: number,
        area: area,
        soil: soil,
        soilclass: soilclass,
        userid: userid
    })
    res.json(database.fields[database.fields.length-1]);
})

app.listen(3001 || process.env.PORT, ()=>{
    console.log(`app is running on port  ${process.env.PORT}`);
})
