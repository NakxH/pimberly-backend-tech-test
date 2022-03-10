const express = require('express');
const mongoose = require('mongoose');
const csvParser = require('csv-parser');
const fs = require('fs');
const csvFilePath = '/files/products.csv'

const app = express();

mongoose
    .connect("mongodb://localhost:27017/pimberly", { useNewUrlParser: true })
    .then(() => {
        const app = express()
        fs.createReadStream(__dirname + csvFilePath)
            .pipe(csvParser({}))
            .on('data', (data) => {
                console.log(data)
            })

        app.listen(3000, () => {
            console.log("Server has started!")
        })
    })