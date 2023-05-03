import Product from "../../models/Product";
import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
    const {method} = req;

    await dbConnect();

    if (method === 'POST') {
        const {title, brand, description, price, oldPrice, sizes, category, quantity} = req.body;
        const productDoc = await Product.create({
            title, 
            brand, 
            description, 
            price, 
            oldPrice, 
            sizes, 
            category, 
            quantity,
        })
        res.json(productDoc);
    }
}