const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
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
            userid: '123'
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
            userid: '123'
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

app.post('/signin', (req, res) => {
    database.users.forEach(user => {
        if (req.body.email === user.email && 
        req.body.password === user.password) {
            return res.json(user);
        }
    })
    res.json(400).json('error logging in');
})

app.post('/register', (req, res) => {
    const { email, name } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    database.users.forEach(user => {
        if (user.id === id) {
            return res.json(user);
        }
    })
    res.status(400).json('not found');
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
    if(data.length > 0){
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

app.listen(3000, ()=>{
    console.log('app is running on port 3000');
})
