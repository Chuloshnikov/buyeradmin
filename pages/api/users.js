import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export default async function handler(req, res) {

    await dbConnect();
    
    res.json(await User.find());
}