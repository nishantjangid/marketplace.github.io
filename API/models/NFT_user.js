const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const nftUser = new Schema({
    name : {
        type : String,
        required: false,
        default: ""
    },
    bio : {
        type : String,
        required : false,
        default: ""
    },
    email : {
        type : String,
        required : false,
        default: ""
    },
    image : {
        type : String,
        required : false,
        default: ""
    },
    coverImage : {
        type : String,
        required : false,
        default: ""
    },
    address : {
        type : String,
        required : true
    },
    twitter : {
        type : String,
        required : false,
        default: ""
    },
    instagram : {
        type : String,
        required : false,
        default: ""
    },
    facebook : {
        type : String,
        required : false,
        default: ""
    },
    block : {
        type : Number,
        default: 0
    }
}, {timestamps : true});

module.exports = mongoose.model('NFTUser', nftUser);