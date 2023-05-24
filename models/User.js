import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String, required: true, maxlength: 60
    },
    email: {
        type: String, required: true, maxlength: 100
    },
    password: {
        type: String, required: true,
    },
},
    {timestamps: true}
)


export default mongoose.models.User || mongoose.model("User", UserSchema);