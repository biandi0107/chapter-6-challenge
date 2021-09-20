const express = require('express')
const app = express()
const { user_game, user_game_biodata, user_game_history } = require('./models')
const port = 3000
const users = require('./db/data.json')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

//HOME
app.get('/', (req, res) => {
    res.render('home')
})

//GAME
app.get('/game', (req, res) => {
    res.render('game')
})

//LOGIN
app.get('/login', (req, res) => {
    res.render('login', { message: '' })
})

app.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const userFound = users.find((user) => {
        return user.email == email;
    })

    if(!userFound) {
        console.log('USER NOT FOUND')
        return res.render('login', {
            message: 'User not found'
        })
    }

    if(userFound.password != password) {
        console.log('INCORRECT PASSWORD');
        return res.render('login', {
            message: 'Incorrect password'
        })
    }

    res.render('home');
})

//CREATE
app.get('/users/create', (req, res) => {
    res.render('user_games/create')
})

app.post('/users', (req, res) => {
    user_game.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(user => {
            res.send('You have successfully CREATED a user')
        })
})

//READ
app.get('/users', (req, res) => {
    user_game.findAll()
        .then(users => {
            res.render('user_games/index', {
                users
            })
        })
})

app.get('/users/:id', (req, res) => {
    user_game.findOne({
        where: { id: req.params.id }
    })
        .then(user => {
            res.render('user_games/show', {
                user
            })
        })
})

//UPDATE
app.get('/users/update/:id', (req, res) => {
    user_game.findOne({
        where: { id: req.params.id }
    })
        .then((user) => {
            res.render('user_games/update', {
                user
            })
        })
})

app.post('/users/update/:id', (req, res) => {
    user_game.update({
        username: req.body.username,
        password: req.body.password
    },
        { where: { id: req.params.id } }
    )
        .then(() => {
            res.send('You have successfully UPDATED a user')
        })
})

//DELETE
app.get('/users/delete/:id', (req, res) => {
    user_game.destroy({
        where: { id: req.params.id }
    })
        .then(() => {
            res.send('You have successfully DELETED a user')
        })
})

app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}`);
})
