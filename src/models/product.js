const mongoose = require("mongoose")

const schema = mongoose.Schema({
	sku: { type: String, unique: true },
	colour: String,
    size: String,
})

module.exports = mongoose.model("Product", schema);