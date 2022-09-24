const router = require("express").Router();
const NFT = require("../models/NFT_info");
const NFTUser = require("../models/NFT_user");
const multer = require("multer");
const path = require("path")
let storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, 'public/uploads/'),
    filename: (req, file, callback) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        callback(null, uniqueName);
    }
})

let upload = multer({
    storage,
    limit: {
        fileSize: 1000000 * 100
    }
}).single('image');

// ADD USER DETAILS
router.post("/addUser", (req, res) => {
    // store file
    upload(req, res, async (err) => {

        try {            
            
            // validate request
            if (!req.file) {
                return res.status(404).json({ code: 500, message: "All fields are required." });
            }            

            if (err) return res.status(500).json({ code: 500, message: err.message });

            const nftuser = await NFTUser.updateOne(
                {  address: req.body.address },
                { $set:
                    {
                        name: req.body.name,
                        bio: req.body.bio,
                        email:req.body.email,
                        image: "/uploads/" + req.file.filename,                        
                        twitter: req.body.twitter,
                        instagram: req.body.instagram,
                        facebook: req.body.facebook                        
                    }
                },               
            );     
            
            return res.status(200).json({ code: 200, message: "User updated successfully" });
        } catch (err) {
            return res.status(500).json({ code: 500, message: err.message });
        }
    })
})

// ADD USER AT FIRST
router.post("/addNewUser", async (req, res) => {
    // store file
        try {                        
            // validate request
            if (!req.body) {
                return res.status(404).json({ code: 500, message: "All fields are required." });
            }

            const OneNFTUser = await NFTUser.findOne({ address: req.body.address });
            
            if (OneNFTUser) return res.status(500).json({ code: 500, message: 1 });                        

            const nftuser = new NFTUser({
                name: req.body.name,
                address: req.body.address               
            });

            const response = await nftuser.save();
            return res.status(200).json({ code: 200, message: "User updated successfully" });
        } catch (err) {
            return res.status(200).json({ code: 500, message: err.message });
        }
    
})

// GET USER DETAILS
router.get("/userDetails/:address",async (req,res)=>{
    try{
        if(!req.params.address) return res.status(500).json({code:500,message:"Please fill required fields"});   
        
        const NFTusers = await NFTUser.find({address : req.params.address});
        if(!NFTusers) return res.status(500).json({code:500,message:"No NFT User found!"});
        return res.status(200).json({code:200,message:NFTusers});
    }catch(err){
        return res.status(500).json({code:500,message:err.message});
    }

})


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

// UPDATE THE USER COVER IMAGE
router.post("/user/updateCover/:address",async (req, res)=>{

    upload(req, res, async (err) => {

        try{
    
            if (!req.file) {
                return res.status(404).json({ code: 500, message: "Please choose the Image." });
            }    
    
            const response = await NFTUser.updateOne(
                            { address: req.params.address },
                            { $set:
                                {
                                    coverImage:"/uploads/" + req.file.filename
                                }
                            }
                            );            
            return res.status(200).json({ code: 200, message: "Cover Image Updated successfully" });        
        }catch(err){
            return res.status(500).json({code:500,message:err.message});
        }
    })
    
});

module.exports = router;