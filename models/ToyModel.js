const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose');

var ToySchema = moongoose.Schema ({
    name : String,
    price : Number,
    image : String,
    description : String,
    brand : String,
    quantity : Number,
    category : String
});

const ToyModel = mongoose.model("Toy", ToySchema, "toys");
module.exports = ToyModel;