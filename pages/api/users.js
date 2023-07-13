import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export default async function handler(req, res) {
    const {method} = req;

    await dbConnect();

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await User.findOne({_id: req.query.id}));
        } else {
            res.json(await User.find());
        }
        
    }
}