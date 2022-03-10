const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const Product = require("./models/Product");

const csvFilePath = "/files/products.csv";

/*
  Function that imports a csv file with headers from a specified path
  
  If all columns contain data and there are no existing products with the same sku in the db
  the product will be saved to the db
  
  If there is an existing product in the db with the same sku that has updated product data,
  it will be updated.
*/
async function handleFile(path) {
  try {
    const count = {
      created: 0,
      updated: 0,
      unchanged: 0,
      skipped: 0,
    };
    const file = await fs.promises.readFile(__dirname + path);
    const fileContents = file.toString();
    const rows = fileContents.split("\n");

    for (let i = 0; i < rows.length; i++) {
      // Skip csv headers
      if (i > 0) {
        const cols = rows[i].split(",");

        if (cols[0] === "") {
          console.log(`missing sku @ ${i}`);
          count.skipped++;
          continue;
        }
        if (cols[1] === "") {
          console.log(`missing colour @ ${i}`);
          count.skipped++;
          continue;
        }
        if (cols[2] === "") {
          console.log(`missing size @ ${i}`);
          count.skipped++;
          continue;
        }

        const foundProduct = await Product.findOne({ sku: cols[0] });
        if (foundProduct) {
          if (
            foundProduct.colour !== cols[1] ||
            foundProduct.size !== cols[2]
          ) {
            foundProduct.colour = cols[1];
            foundProduct.size = cols[2];
            await foundProduct.save();
            count.updated++;
          } else {
            count.unchanged++;
          }
        } else if (foundProduct === null) {
          const product = new Product({
            sku: cols[0],
            colour: cols[1],
            size: cols[2],
          });
          await product.save();
          count.created++;
        }
      }
    }

    console.log(`Number of rows imported: ${rows.length - 1}`);
    console.log(`Number of products created: ${count.created}`);
    console.log(`Number of products updated: ${count.updated}`);
    console.log(`Number of products unchanged: ${count.unchanged}`);
    console.log(`Number of rows skipped: ${count.skipped}`);
  } catch (err) {
    console.error(err);
  }
}

/*
  Connect to databse and start express app
*/
mongoose
  .connect("mongodb://localhost:27017/hakan-cimen-pimberly-tt", {
    useNewUrlParser: true,
  })
  .then(async () => {
    const app = express();

    await handleFile(csvFilePath);

    // Get request to get all products from database
    app.get("/", async (req, res) => {
      const products = await Product.find();
      res.send(products);
    });

    app.listen(3000, () => {
      console.log("Server has started!");
    });
  });
