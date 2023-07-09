import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
    orderId: {
        type: String, required: true
    },
    clientName: {
        type: String, required: true, maxlength: 60
    },
    clientLastName: {
        type: String, required: true, maxlength: 60
    },
    clientPhone: {
        type: Number, required: true, 
    },
    newPost: {
        type: String, required: true, maxlength: 200
    },
    
    amount: {
        type: Number, required: true, 
    },
    status: {
        type: Number, default: 0,
    },
    productData: {
        type:[{
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
            category: {
                type: String, required: true, maxlength: 60
            },
            quantity: {
                type: Number, required: true,
            },
            images: {
                type: [{type: String}]
            },
        }]
    },
    userInfo: {
       type: [{email: {type: String, required: true}, image: {type: String }, name: {type: String, required: true}}]
    },
    paymentMethod: {
        type: String, required: true,
    },
    invoice : {
        type: String, required: true, maxlength: 100
    }
}, {timestamps: true}
);


export default mongoose.models.Order || mongoose.model("Order", OrderSchema);