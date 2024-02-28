const mongoose = require("mongoose");

const reviewSchemaRules= {
 
}

const reviewSchema = new mongoose.Schema(reviewSchemaRules);
const ReviewModel = mongoose.model("reviewModel", reviewSchema);

module.exports = ReviewModel;