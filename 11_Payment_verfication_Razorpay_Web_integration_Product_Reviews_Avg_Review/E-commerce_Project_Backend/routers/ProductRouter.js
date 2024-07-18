const express = require("express");
const ProductRouter = express.Router();
const {
    createProductHandler,
    getProductById,
    deleteProductById
} = require("../controllers/ProductController");
const { checkInput } = require("../controllers/middleWares");
const ProductModel = require("../models/ProductModel");
const { protectRouteMiddleWare, isAuthorizedMiddleWare } = require("../controllers/AuthController");
/***********products***********/
ProductRouter.post("/", checkInput,
    protectRouteMiddleWare, isAuthorizedMiddleWare(['admin', 'seller']),
    createProductHandler);
ProductRouter.get("/", getAllProductHandler);
ProductRouter.get("/:elementId", getProductById);
ProductRouter.delete("/:elementId", protectRouteMiddleWare, isAuthorizedMiddleWare(['admin', 'seller']), deleteProductById);
module.exports = ProductRouter;

async function getAllProductHandler(req, res) {
    try {
        // are done on the level of DB
        // -> find all the data
        // -> sort
        // -> select  

        let query = req.query;
        let selectQuery = query.select;
        let sortQuery = query.sort
        // console.log("selectParam", selectQuery);
        // console.log("sortParam", sortQuery);
        // make a find query -> searching for the product
        let queryResPromise = ProductModel.find()
        // sort the entries 
        if (sortQuery) {
            // "price inc"
            let order = sortQuery.split(" ")[1];
            let sortParam = sortQuery.split(" ")[0];
            // console.log("order", order, "sortParam", sortParam);
            // applying this logic for inc and dec 
            // Construct the sorting string correctly
            let sortString = (order === "inc") ? sortParam : `-${sortParam}`;
            queryResPromise = queryResPromise.sort(sortString);
        }
        if (selectQuery) {
            queryResPromise = queryResPromise.select(selectQuery);
        }
        // when find and sort both are done 
        const result = await queryResPromise;

        res.status(200).json({
            message: result,
            status: "success"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }

    // sorting -> increarsing 
    // selecting -> (name,price)
}