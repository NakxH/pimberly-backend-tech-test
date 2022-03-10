const express = require("express");
const mongoose = require("mongoose");
const csvParser = require("csv-parser");
const fs = require("fs");
const csvFilePath = "/files/products.csv";
const Product = require("./models/Product");

const app = express();

async function handleFile() {
  try {
    const file = await fs.promises.readFile(__dirname + csvFilePath);
    const fileContents = file.toString();
    const rows = fileContents.split("\n");

    for (let i = 0; i < rows.length; i++) {
      if (i > 0) {
        const cols = rows[i].split(",");

        if (cols[0] === "") {
          console.log(`missing sku @ ${i}`);
          continue;
        }
        if (cols[1] === "") {
          console.log(`missing colour @ ${i}`);
          continue;
        }
        if (cols[2] === "") {
          console.log(`missing size @ ${i}`);
          continue;
        }

        const foundProduct = await Product.findOne({ sku: cols[0] });

        if (foundProduct === null) {
          const product = new Product({
            sku: cols[0],
            colour: cols[1],
            size: cols[2],
          });
          await product.save();
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}

mongoose
  .connect("mongodb://localhost:27017/pimberly", { useNewUrlParser: true })
  .then(async () => {
    const app = express();

    await handleFile();

    app.listen(3000, () => {
      console.log("Server has started!");
    });
  });
