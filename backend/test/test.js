const express = require('express')
var Papa = require("papaparse");
const app = express()
var fs = require('fs');

const port = 3000
// require API_helper.js
const api_helper = require('./API_Helper')
var convert = require('xml-js');

app.get('/', (req, res) => res.send('Welcome to Make REST API Calls In Express!'))
var json = []
var c = []
app.get('/csv', (req, res) => {
    
    api_helper.make_API_call('https://raw.githubusercontent.com/illinois/courses-dataset/master/course-schedule/2020-sp.csv')
    .then(response => {
        var obj = Papa.parse(response)
        
        for (i = 0; i < obj['data'].length; i++) {
            //console.log(i)
            //console.log(obj['data'][i][3] + obj['data'][i][4] + obj['data'][i][5])
            //console.log(obj['data'][i][5])
            //console.log('here')
            //console.log(c.includes(`${obj['data'][i][3]} ${obj['data'][i][4]}`))
            if ( !c.includes(`${obj['data'][i][3]} ${obj['data'][i][4]}`) ) {
                c.push(`${obj['data'][i][3]} ${obj['data'][i][4]}`)
                json.push(
                        {
                        "name" : `${obj['data'][i][5]}`,
                        "subject": `${obj['data'][i][3]}`,
                        "number": `${obj['data'][i][4]}`,
                        "rooms": [{
                            "name": "Room 1",
                            "token": `${obj['data'][i][4]}1`
                        },{
                            "name": "Room 2",
                            "token": `${obj['data'][i][4]}2`
                        },{
                            "name": "Room 3",
                            "token": `${obj['data'][i][4]}3`
                        },{
                            "name": "Room 4",
                            "token": `${obj['data'][i][4]}4`
                        }]
                    }
                )
            }
        
        }
        //console.log(obj['data'][1][4])
        console.log(json)
        var jstring = JSON.stringify(json)
        //console.log(jstring)
        fs.writeFile("classes.json",jstring, function(err, result) {
            if(err) console.log('error', err);
          })
        //api_helper.make_API_Post('localhost:4000/api/courses', json).then(res.send(200))
        //post(json)
        res.send(200)
    })
})



app.get('/getAPIResponse', (req, res) => {
    api_helper.make_API_call('https://courses.illinois.edu/cisapp/explorer/catalog/2020/spring.xml')
    .then(response => {
        const subjects = JSON.parse(convert.xml2json(response))
        //console.log(subjects['elements'][0]['elements']['2']['elements'])
        const subj = subjects['elements'][0]['elements']['2']['elements']
        for (i = 0; i < subj.length; i++) {
            if (subj[i]['name'] == 'subject') {
                var sub = subj[i]['attributes']['id']
                //console.log(sub)
                console.log(`https://courses.illinois.edu/cisapp/explorer/catalog/2020/spring/${sub}.xml`)
                //console.log(subj[i]['attributes']['id'])
            }
        }

    }).catch(error => {
        res.send(error)
    })

    // api_helper.make_API_call('https://courses.illinois.edu/cisapp/explorer/catalog/2020/spring/CS.xml')
    // .then(response => {
    //     //console.log(convert.xml2json(response));
    //     const classes = JSON.parse(convert.xml2json(response))
    //     res.send(response)
    //     // const content = classes['elements']
    //     // const elements = content[0]['elements']
    //     // res.send(elements)
    //     // console.log(elements)
    // })
    // .catch(error => {
    //     res.send(error)
    // })
})

// function post(json) {
//     api_helper.make_API_Post('https://localhost:4000/api/courses',json)
//     .then(response => {
//         res.send(200)
//     }
// }

app.listen(port, () => console.log(`App listening on port ${port}!`))