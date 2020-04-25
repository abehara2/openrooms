const express = require('express')
const app = express()
const port = 3000
// require API_helper.js
const api_helper = require('./API_Helper')
var convert = require('xml-js');

app.get('/', (req, res) => res.send('Welcome to Make REST API Calls In Express!'))

app.get('/getAPIResponse', (req, res) => {
    api_helper.make_API_call('https://courses.illinois.edu/cisapp/explorer/catalog/2020/spring/CS.xml')
    .then(response => {
        console.log(convert.xml2json(response));
    })
    .catch(error => {
        res.send(error)
    })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))