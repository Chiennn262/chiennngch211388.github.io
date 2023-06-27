const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose');

var CategorySchema = moongoose.Schema ({
    name : String,
    description : String
});

const CategoryModel = mongoose.model("Category", CategorySchema, "categories");
module.exports = CategoryModel;