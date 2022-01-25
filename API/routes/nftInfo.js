const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const NFT = require("../models/NFT_info");

let storage = multer.diskStorage({
    destination : (req, file, callback) => callback(null, 'uploads/'),
    filename : (req, file, callback) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        callback(null, uniqueName);
    }
})

let upload = multer({
    storage,
    limit : {
        fileSize : 1000000 * 100
    }
}).single('image');

router.post("/add",(req,res)=>{
    // store file
    upload(req,res, async(err)=>{

        try{            
            console.log(req);
            // validate request
            if(!req.file){
                return res.status(404).json({error:"All fields are required."});            
            }
    
            if(err) return res.status(500).json({error:err.message});
    
            const nft = new NFT({
                name : req.body.name,
                description : req.body.description,
                path: req.file.path,
                tokenId : req.body.tokenId,
                price : req.body.price,
                royalities : req.body.royalities
            });
    
            const response = await nft.save();
            return res.status(200).json({"message":"NFT inserted successfully"});
        }catch(err){
            return res.status(200).json({error:err.message});
        }
    })
})

router.get("/get-one/:id",async (req,res)=>{
    try{
        const OneNFT = await NFT.findOne({tokenId : req.params.id});

        if(!OneNFT) return res.status(500).json({error:"No NFT found!"});

        return res.status(200).json({message:OneNFT});
    }catch(err){
        return res.status(500).json({error:err.message});
    }
   if(!req.params.id) return res.status(500).json({error:"Please provide a details"});   

})

router.get("/get-all/",async (req,res)=>{
    try{
        const OneNFT = await NFT.find();

        if(!OneNFT) return res.status(500).json({error:"No NFT found!"});

        return res.status(200).json({message:OneNFT});
    }catch(err){
        return res.status(500).json({error:err.message});
    }
   if(!req.params.id) return res.status(500).json({error:"Please provide a details"});   

})

module.exports = router;