const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose
    .connect("mongodb://localhost:27017/pimberly", { useNewUrlParser: true })
    .then(() => {
        const app = express()
        app.listen(3000, () => {
            console.log("Server has started!")
        })
    })