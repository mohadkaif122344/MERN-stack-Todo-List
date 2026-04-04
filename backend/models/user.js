import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    fullName : {
        type: String, required: true
    },
    email : {
        type: String, required: true
    },

    password : {
        type: String, required:true
    }
},
    {timestamps: true},
);

const Users = mongoose.model("Users", todoSchema);

export default Users;