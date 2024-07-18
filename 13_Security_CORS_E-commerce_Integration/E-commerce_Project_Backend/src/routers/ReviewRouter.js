const express = require("express");
const ReviewRouter = express.Router();
const ReviewModel = require("../models/ReviewModel");
const { protectRouteMiddleWare } = require("../controllers/AuthController");
const UserModel = require("../models/UserModel");
const ProductModel = require("../models/ProductModel");

const createReviewController = async (req, res) => {
    try {
        // do implementation 
        // give a particular rating to a product with review
        // calculate avg rating as well
        // push that review data in the productModel
        const { review, rating } = req.body;
        const { productId } = req.params;
        const userId = req.userId;

        const reviewObject = await ReviewModel.create({
            review,
            rating,
            product: productId,
            user: userId
        });

        const productObject = await ProductModel.findById(productId);
        const averageRating = productObject.averageRating;

        if (averageRating) {
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
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 items per page if not specified
    const productId = req.params.productId; // Assuming you're passing productId as a route parameter

    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    try {
        // Assuming reviews are stored with a reference to the product they belong to
        const reviews = await ReviewModel.find({ product: productId })
            .populate('user', 'username') // Only populate 'username' from 'userModel'
            .skip(skip)
            .limit(limit)
            .sort({ rating: -1 }); // Sort by creation time in descending order

        const totalReviews = await ReviewModel.countDocuments({ product: productId });

        res.status(200).json({
            status: "success",
            data: {
                reviews,
                total: totalReviews,
                page,
                limit,
                totalPages: Math.ceil(totalReviews / limit)
            }
        });
    } catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message
        });
    }
}

ReviewRouter.post("/:productId", protectRouteMiddleWare, createReviewController);

ReviewRouter.get("/:productId", getAllReviewForAProductController);

module.exports = ReviewRouter;