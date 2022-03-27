const router = require("express").Router();
const NFT = require("../models/NFT_info");

// GET USER NFTS
router.get("/user-nfts/:address",async (req,res)=>{
    try{
        if(!req.params.address) return res.status(500).json({code:500,message:"Please fill required fields"});   
        
        const NFTs = await NFT.find({ownerAddress : req.params.address});
        if(!NFTs) return res.status(500).json({code:500,message:"No NFT found!"});
        return res.status(200).json({code:200,message:NFTs});
    }catch(err){
        return res.status(500).json({code:500,message:err.message});
    }

})

// GET USER ON SALE DATA
router.get("/user-onsale/:address",async(req,res)=>{
    try{
        if(!req.params.address) return res.status(500).json({code:500,message:"Please fill required fields"});   
        
        const NFTs = await NFT.find({ownerAddress : req.params.address,resell:1});
        if(!NFTs) return res.status(500).json({code:500,message:"No NFT found!"});
        return res.status(200).json({code:200,message:NFTs});
    }catch(err){
        return res.status(500).json({code:500,message:err.message});
    }    
})

// GET USER OWNED DATA
router.get("/user-owned/:address",async(req,res)=>{
    try{
        if(!req.params.address) return res.status(500).json({code:500,message:"Please fill required fields"});   
        
        const NFTs = await NFT.find({ownerAddress : req.params.address,creatorAddress:{$ne:req.params.address}});
        if(!NFTs) return res.status(500).json({code:500,message:"No NFT found!"});
        return res.status(200).json({code:200,message:NFTs});
    }catch(err){
        return res.status(500).json({code:500,message:err.message});
    }    
})

// GET USER OWNED DATA
router.get("/user-created/:address",async(req,res)=>{
    try{
        if(!req.params.address) return res.status(500).json({code:500,message:"Please fill required fields"});   
        
        const NFTs = await NFT.find({creatorAddress : req.params.address});
        if(!NFTs) return res.status(500).json({code:500,message:"No NFT found!"});
        return res.status(200).json({code:200,message:NFTs});
    }catch(err){
        return res.status(500).json({code:500,message:err.message});
    }    
})

module.exports = router;