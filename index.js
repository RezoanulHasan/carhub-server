const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());

const reviews = require('./data/reviews.json');
const cars = require('./data/cars.json');

const pageSize = 6;
const maxPages = 10;

app.get('/', (req, res) => {
    res.send('Car-Hub Server is running........');

    app.get('/cars/:id', (req, res) => {
        const { id } = req.params;
        const selectedCar = cars.find(car => car.id == id) || {};
        res.send(selectedCar);
    });


});


app.get('/cars/:page', (req, res) => {
    const page = parseInt(req.params.page) || 1;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedCars = cars.slice(startIndex, endIndex);
    const totalPages = Math.ceil(cars.length / pageSize);

    const paginationInfo = {
        totalCars: cars.length,
        totalPages,
        currentPage: page,
        maxPages,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null
    };

    res.send({ cars: paginatedCars, paginationInfo });
});
app.get('/cars', (req, res) => {
    res.send(cars);
})




app.get('/totalCars', (req, res) => {
    const totalCars = cars.length;
    res.send({ totalCars });
});

app.get('/reviews', (req, res) => {
    res.send(reviews);
});

app.get('/search/cars', (req, res) => {
    const { query } = req.query;
    const filteredCars = cars.filter(car => car.model.includes(query));
    res.send(filteredCars);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});