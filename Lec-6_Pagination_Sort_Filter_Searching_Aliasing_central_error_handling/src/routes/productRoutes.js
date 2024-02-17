const express = require('express');

const { 
  createProduct,
  getProducts,
  getProductById,
//   updateProductById,
//   deleteProductById 
}  = require('../controllers/ProductController');

const ProductModel = require('../models/ProductModel');

// create the utility:
// convert into the object from the JSON
// before converting the object i need to append $ in the key - Why so, because mongodb requires the query params with $.

const transformQueryHelper = (myQuery) => {
   console.log("My query -> ", myQuery);
   const parseQuery = JSON.parse(myQuery);

    const queryOpertaors = {
      gt: '$gt',
      lt: '$lt',
      gte: '$gte',
      lte: '$lte',
      // add any other operator is required
    }

    for(let key in parseQuery){
      let internalObj = parseQuery[key];

      if(typeof internalObj === 'object'){
        // in the inner object -> adding $before the operator lt -> $lt
        for(let innerKey in internalObj) {

          if(queryOpertaors[innerKey]){
            // lt -> $lt
            internalObj[`$${innerKey}`] = internalObj[innerKey]; // { 'lt': 10 } -> { '$lt': 10 } 
            delete internalObj[innerKey];
          }
        }
      }
    }

   console.log("parsed query -> ", parseQuery);

  // {"stock": {"lt": 10}} ->  {stock: {"$lt": 10}}
  return parseQuery;
}

const getTop4Products = async(req, res, next) => {
  
  req.query.myQuery = JSON.stringify({

    stock: {'lt': 10},
    averageRating: {'gt': 4.8}

  });
  //{"stock": {"lt": 10},"averageRating": {"gt":4.8}}

  // res.status(200).json({

  // })
  next();
}


const getProductsHandler = async(req, res) => {
  try {

    const query = req.query;
  const sortParams = query.sort;
  const selectParams = query.selectQuery;
  // const myQuery = query.myQuery;

  // console.log(sortParams, selectParams, myQuery);

  // Filtering the data at more granular level
  /**
   * 1. basic filter: ProductModel.find({ name: 'iphone 6' });
   * 2. filtering the data based on mongodb query opertors:ProductModel.find({ price: {$gt: 50000} });
   * 3. For more granulat level filtering:
          ProductModel.find()
                                .where('price').lt(100000)
                                .where('name').equals('iphone 6');
   */

  // let queryResponsePromise = ProductModel.find({ price: {$gt: 100000} });
  // let queryResponsePromise = ProductModel.find()
  //                               .where('price').lt(100000)
  //                               .where('name').equals('iphone 6');


    let queryResponsePromise = ProductModel.find();

    const myQuery = query.myQuery;

   // convert into the object from the JSON
   // before converting the object i need to append $ in the key - Why so, because mongodb requires the query params with $.

   const transformedQuery = transformQueryHelper(myQuery);

   if(transformedQuery){
    queryResponsePromise = ProductModel.find(transformedQuery);
   }

  // const filterParams = query.filter;

  //const filterObj = JSON.parse(JSON.stringify(filterParams));

  //console.log(filterObj);

  // if(filterParams) { // postman url will be : localhost:3040/api/products?filter={"categories": "electronics"}
  //   console.log(filterParams);
  //   const filterObj = JSON.parse(filterParams);

  //   queryResponsePromise = queryResponsePromise.find(filterObj);
  // }

  //queryResponsePromise = queryResponsePromise.find({price: 100000});

  

// Sorting
  // if(sortParams) {
  //   console.log(sortParams.split(' '));
  //   const [sortParam, order] = sortParams.split(' '); // ['price', 'desc']
    

  //   if(order === 'asc') {
  //     queryResponsePromise = queryResponsePromise.sort(sortParam);
  //   } else {
  //     queryResponsePromise = queryResponsePromise.sort(`-${sortParam}`);
  //   }
  // }

  // if(selectParams) {
  //   queryResponsePromise = queryResponsePromise.select(selectParams);
  // }

  // pagination

     /**
      * page: show the page number
      * limit: number of documents to be returned
      * skip: number of documents to be skipped
      */

    // const page = query.page || 1;
    // const limit = query.limit || 1;
    // const skip = (page - 1) * limit; // return you the first index of data

    // queryResponsePromise = queryResponsePromise.skip(skip).limit(limit);

    const result = await queryResponsePromise;

    res.status(200).json({
        message: 'Get products successfully',
        data: result
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
        message: 'Internal Server Error',
    });
  }
}

const { checkInput } = require('../utils/curdFactory');

  const router = express.Router();

  router.post('/', checkInput, createProduct);
  router.get('/', getProducts);

  // router.get('/', getProductsHandler);
  router.get('/bigBillionDay', getTop4Products, getProductsHandler);
  router.get('/:id', getProductById);
//   router.put('/:id', checkInput, updateProductById);
//   router.delete('/:id', deleteProductById);

  module.exports = router;

