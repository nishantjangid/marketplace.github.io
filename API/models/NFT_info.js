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
    },
    ownerAddress : {
        type : String,
        required : true
    },
    creatorAddress : {
        type : String,
        required : true
    },
    resell:{
        type:Number,
        require:true,
        default:"1"
    },
}, {timestamps : { createdAt: 'created_on', updatedAt: 'updated_on' }});

module.exports = mongoose.model('NFT', nftInfo);