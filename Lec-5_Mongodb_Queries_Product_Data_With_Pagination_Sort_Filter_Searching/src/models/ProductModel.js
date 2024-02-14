const mongoose =  require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        unique: [true, 'Product name is unique'],
        maxLength: [40, 'Product name should be less than 40 characters']
    },

    price: {
       type: Number,
       required: [true, 'Product price is required'],
       validate: {
            validator: function(){
                return this.price > 0;
            },
            message: "Price of the product should be greater than 0"
       }
    },

    categories: {
        required: true,
        type: [String]
    },

    averageRating: Number,

    discount: {
        type: Number,
        validate: {
            validator: function(){
                return this.discount < this.price;
            },
            message: "Discount should be less than product price"
       }
    },

    decription: {
        type: String,
        required: [true, 'Please provide some description'],
        maxLength: [200, 'desc should be less than od 200 chnaracters']
    },

    brand: {
        type: String,
        required: [true, 'Brand is required']
    }
});

const validCategories = ['electronics', 'audio', 'accessories', 'clothes'];

productSchema.pre("save", function(next){
    const product = this;


    const invalidCategoriesArr = product.categories.filter((category)=>{
        return !validCategories.includes(category);
    });

    if(invalidCategoriesArr.length > 0) {
        const err = new Error(`product from ${invalidCategoriesArr[0]} categories are not the part of valid categories right now`);

        console.log(err);

        return next(err);

    } else {
        next(); // it will pass the control to the next middleware function.
    }
})



const ProductModel = mongoose.model("ProductModel", productSchema);

module.exports = ProductModel;

