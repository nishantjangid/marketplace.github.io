const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const nftCollection = new Schema({
    name : {
        type : String,
        required: false,
        default: ""
    },    
    image : {
        type : String,
        required : false,
        default: "/uploads/1651233675869-155047266.gif"
    },
    address : {
        type : String,
        required : true
    },
    block : {
        type : Number,
        default: 0
    }
}, {timestamps : true});

module.exports = mongoose.model('NFTCollection', nftCollection);