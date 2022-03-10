# Pimberly Backend Tech Test

## Setup

- Must have MongoDB running locally with a database name of `hakan-cimen-pimberly-tt`
- First of all install all the dependencies by running `npm install`
- To run the app in the command line use `npm start`

## What I have done

- Created an express app that connects to a local Mongodb.
- Created a function that reads a csv file and validates the file based on the criteria provided. This function then writes the products to the database.
- Added a route to get all of the products from the database.

## Improvements

- I would have liked to have added tests If I had more knowledge on jest.
- I would have liked to have added filters to the get request that returns all products.
- I could have split the handleFile function into more reusable code.
  - Could have moved the validation into another function.
  - Could have moved the reading of the file to its own function.

## Problems that I faced

- I have never loaded a file from the file system before.
- I had an issue with asynchronously saving products to the database. I had to research around using promises from the fs module. This is because I was firing and forgetting when saving a product. This meant that products were not saved into the database before going onto the next one, which did not allow me to check for duplicate products.
