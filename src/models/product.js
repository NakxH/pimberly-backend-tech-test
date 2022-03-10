const mongoose = require("mongoose")

const schema = mongoose.Schema({
	sku: { type: String, required: true, unique: true },
	colour:  { type: String, required: true },
    size:  { type: String, required: true },
})

module.exports = mongoose.model("Product", schema);