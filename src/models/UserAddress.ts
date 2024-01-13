import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true, default:"Daudkandi" },
        postalCode: { type: Number, required: true ,default:1234},
        country: { type: String, required: true , default:"Bangladesh" },
        phone:{ type: String, required: true },
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
},{timestamps : true});

const UserAdress = mongoose.models.UserAddress || mongoose.model("UserAddress", AddressSchema);

export default UserAdress
