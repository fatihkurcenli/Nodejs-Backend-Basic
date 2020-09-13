const express = require('express')
const app = express()
const port = 3000
var HttpStatus = require('http-status-codes');

var userList = ["Fatih", "Sena", "Mehmet", "Ali"]

app.use(express.json());

/* app.get('/', (req, res) => {
    res.json([
        { "name": "Fatih" },
        { "name": "Fatih" },
        { "name": "Fatih" }
    ]).sendStatus(HttpStatus.OK)
}) */
app.listen(port, () => console.log(`Example app listining port `))


app.get('/users', (req, res) => {
    res.json(userListMap()).sendStatus(HttpStatus.OK)
})


function userListMap() {
    return userList.map(value => ({
        "name": value
    }));
}


app.post('/users', function (req, res) {
    const { name } = req.body;
    userList.push(name);
    res.sendStatus(HttpStatus.OK);
})


app.delete('/users/:name', function (req, res) {
    const { name } = req.params;
    userList = userList.filter(user => {
        return user != name;
    });
    res.send(userListMap());
});


app.put('/users/:name', function (req, res) {
    const {
        name
    } = req.params;
    const {
        newName
    } = req.query
    userList = userList.map(user => {
        if (user == name) {
            return newName;
        } else {
            return user;
        }
    });
    res.send(userListMap());
});