const mongoose = require("mongoose");

const reviewSchemaRules= {
   //review, rating, createdAt, user, product

    review:{
        type: String,
        required: [true, "Review can't be empty"]
    },

    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "Review must contain some ratings"]
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "userModel",
        required: true,
    },

    product: {
        type: mongoose.Schema.ObjectId,
        ref: "productModel",
        required: true,
    }
 
}

const reviewSchema = new mongoose.Schema(reviewSchemaRules);
const ReviewModel = mongoose.model("reviewModel", reviewSchema);

module.exports = ReviewModel;