const mongoose = require("mongoose");
// ecommerce -> Amazon 
const bookingSchemaRules = {
 // define the booking schema
   
   bookedAt: {
        type: Date,
        default: Date.now()
   },
   priceAtThatTime: {
        type: Number,
        // error handling 
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "pending",
        enum: ['pending',"failed","success"]
    },

    user: {
      type: [mongoose.Schema.ObjectId],
      required: true,
      ref: "userModel"
    },

    product: {
        type: [mongoose.Schema.ObjectId],
        required: true,
        ref: "productModel"
    },

    payment_order_id: {
        type: String
    }
}

const bookingSchema = new mongoose.Schema(bookingSchemaRules);
// this model -> will have queries 
const BookingModel = mongoose.model("bookingModel", bookingSchema);

module.exports = BookingModel;