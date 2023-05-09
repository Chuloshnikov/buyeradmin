import BannerInfo from "@/models/BannerInfo";
import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
    const {method} = req;

    await dbConnect();

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await BannerInfo.findOne({_id: req.query.id}));
        } else {
            res.json(await BannerInfo.find());
        }
        
    }

    if (method === 'POST') {
        const {title, description, imageUrl} = req.body;
        const bannerDoc = await BannerInfo.create({
            title, 
            description, 
            imageUrl,
        })
        res.json(bannerDoc);
    }

    if (method === 'PUT') {
        const {title, description, _id, imageUrl} = req.body;
        await BannerInfo.updateOne({_id}, {title, description, imageUrl});
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await BannerInfo.deleteOne({_id: req.query?.id});
            res.json(true);
        }
    }
}