const express = require('express')
const hbs = require('hbs')
const app = express()
const fs = require('fs')

const port = process.env.PORT || 3000

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use((req, res, next) => {
    const now = new Date().toString()
    const log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + `\n`, (error) => {
        if(error) {
            console.log('Unable to append to server.log')
        }
    })
    next()
})

app.use((req, res, next) => {
    res.render('maintenance')
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => { 
    res.render('home', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website!!',
        currentYear: new Date().getFullYear()
    })})

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    })
})

app.listen(port, () => {
    console.log(`Server is ready on ${port}!`)
})