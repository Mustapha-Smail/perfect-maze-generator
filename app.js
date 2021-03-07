const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.route('/')
    .get((req, res) => {
        res.render('home');
    })

    .post((req, res) => {
        let mazeWidth = req.body.mazeWidth;
        let mazeHeight = req.body.mazeHeight;
        res.render('maze', { mazeWidth: mazeWidth, mazeHeight: mazeHeight });
    });

app.listen(8080, () => {
    console.log('Server started successfully on port 8080');
})