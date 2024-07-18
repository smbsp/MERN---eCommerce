const ProductModel = require('../models/ProductModel');

const {
    createFactory,
    getAllFactory,
    getByIdFactory,
    updateByIdFactory,
    deleteByIdFactory
} = require('../utils/curdFactory');

// const createProduct = async(req, res) => {
//     try {
//         const product = await ProductModel.create(req.body);

//         if(!product) {
//             res.status(404).json({message: 'Product not found'});
//         }

//         res.status(201).json({
//             message: 'Product created successfully',
//             data: product
//         });
//     } catch(error) {
//        res.status(500).json({message: error.message});
//     }
// }

// const getProducts = async (req, res) => {
//     try {
//         const products = await ProductModel.find();
//         if(!products.length) {
//             res.status(404).json({message: 'Product not found'});
//             //throw new Error('Product not found');
//         }
//         res.status(200).json({
//             data: products
//         });
//     } catch (error) {
//        res.status(500).json({message: error.message}); 
//     }
// }

// const getProductById = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const product = await ProductModel.findById(id);
//         if(!product) {
//             res.status(404).json({message: 'Product not found'});
//         }

//         res.status(200).json({
//             data: product
//         });
//     } catch (error) {
//        res.status(500).json({message: error.message}); 
//     }
// }

// const updateProductById = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const product = await ProductModel.findByIdAndUpdate(id, req.body, {new: true});
//         if(!product) {
//             res.status(404).json({message: 'Product not found!'}); 
//         }
//         res.status(200).json({
//             message: 'Product updated successfully',
//             data: product
//         });
//     } catch (error) {
//        res.status(500).json({message: error.message}); 
//     }
// }

// const deleteProductById = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const product = await ProductModel.findByIdAndDelete(id);
//         if(!product) {
//             res.status(404).json({message: 'Product not found!'}); 
//         }
//         res.status(200).json({
//             message: 'Product has been deleted.',
//             data: product
//         });
//     } catch (error) {
//        res.status(500).json({message: error.message}); 
//     }
// }

const createProduct = createFactory(ProductModel);
const getProducts = getAllFactory(ProductModel);
const getProductById = getByIdFactory(ProductModel);
// const updateProductById = updateByIdFactory(ProductModel);
// const deleteProductById = deleteByIdFactory(ProductModel);

module.exports = {
  createProduct,
  getProducts,
  getProductById,
//   updateProductById,
//   deleteProductById
}