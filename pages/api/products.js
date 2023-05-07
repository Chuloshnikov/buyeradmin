import Product from "../../models/Product";
import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
    const {method} = req;

    await dbConnect();

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Product.findOne({_id: req.query.id}));
        } else {
            res.json(await Product.find());
        }
        
    }

    if (method === 'POST') {
        const {title, brand, description, price, oldPrice, sizes, category, quantity, images} = req.body;
        const productDoc = await Product.create({
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
        const {title, brand, description, price, oldPrice, sizes, category, quantity, _id, images} = req.body;
        await Product.updateOne({_id}, {title, brand, description, price, oldPrice, sizes, category, quantity, images});
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Product.deleteOne({_id: req.query?.id});
            res.json(true);
        }
    }
}