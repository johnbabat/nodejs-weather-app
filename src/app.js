const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const port = process.env.PORT || 3000;

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// sSetup static directory to serve
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'John Babatola',
        imgsrc: '/img/weather.png'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'John Babatola'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather',
        name: 'John Babatola'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({error: 'Error: You have to give an address'});
    }

    const address = req.query.address;

    geocode(address, (error, {latitude, longtitude, location} = {}) => {
    
        if(error) {
            return res.send(error)
        }
        forecast(latitude, longtitude, (error, forecastdata) => {
            if(error){
                return res.send(error);
            }
            res.send({
                address,
                location,
                forecast: forecastdata
            })
        });

    })


})

app.get('*', function(req, res) {
    res.render('404', {
        title: '404 ERROR!',
        name: 'John Babatola'
    });
})

app.listen(port, () => {
    console.log('Server is running on port ' + port);
})