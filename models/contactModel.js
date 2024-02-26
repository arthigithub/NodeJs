const mongoose = require('mongoose');
const userModel = require('./userModel');

const contactSchema = mongoose.Schema({
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    name: {
        type:String,
        required:[true,"Please add the contact name"],
    },
    email: {
        type:String,
        required:[true,"Please add the contact email address"],
    },
    designation: {
        type:String,
        required:[true,"Please add the contact designation"],
    },
    mobile: {
        type:String,
        required:[true,"Please add the contact mobile number"],
    },
},{
    timestamps:true,
}
);

module.exports = mongoose.model("Contact",contactSchema);