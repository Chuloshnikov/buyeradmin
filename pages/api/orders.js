import Order from "../../models/Order";
import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
    const {method} = req;

    await dbConnect();

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Order.findOne({_id: req.query.id}));
        } else {
            res.json(await Order.find());
        }
        
    }

    if (method === 'POST') {
        const {title, brand, description, price, oldPrice, sizes, category, quantity, images} = req.body;
        const productDoc = await Order.create({
            title, 
            brand, 
            description, 
            price, 
            oldPrice, 
            sizes, 
            category, 
            quantity,
            images,
        })
        res.json(productDoc);
    }

    if (method === 'PUT') {
        const {
                orderId, 
                productData, 
                userInfo, 
                amount, 
                clientName, 
                clientLastName, 
                clientPhone, 
                newPost, 
                paymentMethod, 
                status, 
                invoice } = req.body;
        await Order.updateOne({_id}, {
            orderId, 
            productData, 
            userInfo, 
            amount, 
            clientName, 
            clientLastName, 
            clientPhone, 
            newPost, 
            paymentMethod, 
            status, 
            invoice
            });
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Order.deleteOne({_id: req.query?.id});
            res.json(true);
        }
    }
}