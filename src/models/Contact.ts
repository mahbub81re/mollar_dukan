import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    message:{
        type:String,
        required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    read: {
        type: Boolean,
        default:false
    },
    replaies:[{
        type:String,
    }]
},{timestamps : true});

const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export default Contact
