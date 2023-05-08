import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    title: {
        type: String, required: true, maxlength: 60
    },
    brand: {
        type: String, required: true, maxlength: 60
    },
    description: {
        type: String, required: true, maxlength: 1000
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
    },
    category: {
        type: String, required: true, maxlength: 60
    },
    quantity: {
        type: Number, required: true,
    },
    images: {
        type: [{type: String}],
    },
}, {timestamps: true}
);


export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
