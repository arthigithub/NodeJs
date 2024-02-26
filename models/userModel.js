const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type:String,
        required:[true,"Please add the contact name"],
    },
    email: {
        type:String,
        required:[true,"Please add the user email address"],
        unique:[true,"entry valid mail address"],
    },
    password: {
        type:String,
        required:[true,"Please add password"],
    },
},{
    timestamps:true,
}
);

module.exports = mongoose.model("User",userSchema);