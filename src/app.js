const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.POST || 3000

//Define path for Express config
const pathDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');


//Setup handlebars engine and views location
app.set('views', viewPath);
app.set('view engine', 'hbs');

hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(pathDirectory));

app.get('', (req, res) => {
    
    res.render('index', {
        title: 'Weather App',
        name: ' Nanhe Kumar Pandey'
    });
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: ' Nanhe Kumar Pandey'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: ' Nanhe Kumar Pandey',
        helpText: 'Help Text....'
    });
});



app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send( {
            error:'You must provide a address term'
        })
    }

    geocode(req.query.address, (error, { Latitude, Longitude, Location } = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(Latitude, Longitude, (error, forecastData) => {
            if(error) {
                return res.send(error);
            }
            res.send( {
                forecast: forecastData,
                Location,
                address: req.query.address
            })
        })

    })



    // console.log(req.query);

    // res.send({
    //     forecast: 'It is raining',
    //     location: 'Patna',
    //     address: req.query.address
    // })
});
//






//
app.get('/products', (req,res) => {

    if(!req.query.search) {
        return res.send( {
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})


// app.get('/help/*', (req, res) => {
//     res.render('404',
//         {problem:'Help result not found please visit main help page....'},
//     )
// });

// app.get('/about/*', (req, res) => {
//     res.render('404',
//     {problem:'About result not found please visit main about page....'}
//     )
// });

// app.get('/weather/*', (req, res) => {
//     res.render('404',
//     {problem:'Weather result not found please visit main weather page....'}
//     )
// });

app.get('*', (req, res) => {
    res.render('404',

    {
        title: '404',
        name: 'Nanhe Kumar Pandey',
        errorMessage:'404... Page not found!'
    }
    )
})

app.listen(port, () => {
    console.log('Server is up on port '+port);
});