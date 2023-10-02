//for express
const express = require('express');
const app = express();
//for data cors policy
var cors = require('cors');
const port = process.env.PORT || 5000;


// use   middleware
app.use(cors());



// for reviews data
const reviews  = require('./data/reviews.json');
const datas  = require('./data/cars.json');


app.get('/', (req, res) => {
    res.send(' Car-Hub  Server is running........')
});


app.get('/cars', (req, res) => {
    res.send(datas);
})



app.get('/cars/:id', (req, res) => {
    const {id} = req.params;
    const selectedData = datas.find(n => n.id ==id) || {} ;
    res.send(selectedData);
})

// for reviews data 

app.get('/reviews', (req, res) => {
    res.send(reviews);
 })
 












app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })