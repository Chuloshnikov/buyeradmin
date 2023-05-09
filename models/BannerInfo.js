import mongoose from "mongoose";

const BannerInfoSchema = new mongoose.Schema({
    title: {
        type: String, required: true, maxlength: 60
    },
    description: {
        type: String, required: true, maxlength: 200
    },
    imageUrl: {
        type: String, required: true,
    }
});

export default mongoose.models.BannerInfo || mongoose.model("BannerInfo", BannerInfoSchema);

