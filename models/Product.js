import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    _id: {
        type: Number, required: true, 
    },
    title: {
        type: String, required: true, maxlength: 60
    },
    brand: {
        type: String, required: true, maxlength: 60
    },
    description: {
        type: String, required: true, maxlength: 300
    },
    oldPrice: {
        type: Number, required: false, 
    },
    price: {
        type: Number, required: true, 
    },
    sizes: {
        type: String, required: false,
    },
    images: {
        type: [{type: String}]
    }
    category: {
        type: String, required: true, maxlength: 60
    },
    quantity: {
        type: Number, required: true,
    }
}, {timestamps: true}
);


export default mongoose.models.ProductData || mongoose.model("ProductData", ProductSchema);
