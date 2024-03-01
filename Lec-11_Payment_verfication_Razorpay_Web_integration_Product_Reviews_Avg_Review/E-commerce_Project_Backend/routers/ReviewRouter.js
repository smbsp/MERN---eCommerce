const express = require("express");
const ReviewRouter = express.Router();
const ReviewModel = require("../models/ReviewModel");
const { protectRouteMiddleWare } = require("../controllers/AuthController");
const UserModel = require("../models/UserModel");
const ProductModel = require("../models/ProductModel");

const createReviewController = async(req, res) =>{
    try {
        // do implementation 
        // give a particular rating to a product with review
        // calculate avg rating as well
        // push that review data in the productModel
        const { review, rating }  = req.body;
        const { productId } = req.params;
        const userId = req.userId;

        const reviewObject =  await ReviewModel.create({
            review,
            rating,
            product: productId,
            user: userId
        });

        const productObject = await ProductModel.findById(productId);
        const averageRating = productObject.averageRating;

        if(averageRating){
           let sum = averageRating * productObject.reviews.length;

           let finalAvgRating = (sum + reviewObject.rating) / (productObject.reviews.length + 1); // (sum of all the ratings including average rating)/ number of reviews

           productObject.averageRating = finalAvgRating;
        } else {
            productObject.averageRating = reviewObject.rating;
        }

        productObject.reviews.push(reviewObject['_id']);
        await productObject.save();

        res.status(201).json({
            satus: "success",
            data: reviewObject
        });

    } catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}

const getAllReviewForAProductController = async function (req, res) {
   
   try {
        // do implementation here -> as a homework

        // get the data from reviewModel
        // filter the query via page=1&limit=10
        // send as a response.

    } catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}

ReviewRouter.post("/:productId", protectRouteMiddleWare, createReviewController);

ReviewRouter.get("/:productId", getAllReviewForAProductController);

module.exports = ReviewRouter;