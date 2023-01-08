
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const { v4: uuid } = require('uuid'); //For generating ID's

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/tacos', (req, res) => {
    res.send('GET /tacos response');
})


const comments = [
    {
        // id: 1,
        id: uuid(),
        username:'Todd',
        comment:'lol that is so funny!'
    },
    {
        // id: 2,
         id: uuid(),
        username:'Nicky',
        comment:'Josita!!'
    },
    {
        // id: 3,
         id: uuid(),
        username:'Sk8erBoi',
        comment:'Plz delete your accounts, Todd!'
    },
    {
        // id: 4,
         id: uuid(),
        username:'onlysayswoof',
        comment:'woof woof woof'
    },
]

app.get('/comments', (req, res) => {
    res.render('comments/index', {comments});
} )


// NEW - Sends data to the POST request
app.get('/comments/new', (req, res) => {
    res.render('comments/new')
} )

// NEW - POST request
app.post('/comments', (req, res) => {
    const {username, comment} = req.body
    // comments.push({username, comment})
    comments.push({username, comment, id: uuid()})
    res.redirect('/comments');
})

 
app.get('/comments/:id', (req, res) =>{
    const { id } = req.params;
    const comment = comments.find(c => c.id ===id);
    // const comment = comments.find(c => c.id === parseInt(id));
    res.render('comments/show', { comment })
} )




app.post('/tacos', (req, res) => {
    const {meat, qty} = req.body;
    res.send(`Ok, here are your ${qty} ${meat} tacos`);
    })


app.listen(3000, () => {
    console.log("ON PORT 3000!")
})
