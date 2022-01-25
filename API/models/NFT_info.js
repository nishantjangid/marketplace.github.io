const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const nftInfo = new Schema({
    name : {
        type : String,
        required: true
    },
    description : {
        type : String,
        required : true,
    },
    path : {
        type : String,
        required : true
    },
    tokenId : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    royalities : {
        type : Number,
        required : false
    }
}, {timestamp : true});

module.exports = mongoose.model('NFT', nftInfo);