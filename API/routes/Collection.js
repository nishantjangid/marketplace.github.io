const router = require("express").Router();
const NFTCollection = require("../models/NFT_collection");
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

// ADD COLLECTION DETAILS
router.post("/addCollection", (req, res) => {
    // store file
    upload(req, res, async (err) => {

        try {            
            
            // validate request
            if (!req.file) {
                return res.status(404).json({ code: 500, message: "All fields are required." });
            }            

            if (err) return res.status(500).json({ code: 500, message: err.message });

            const nftCollection =  new NFTCollection({
                name: req.body.name,
                image: "/uploads/" + req.file.filename,                
                address: req.body.address,
            });    
            const response = await nftCollection.save();
            return res.status(200).json({ code: 200, message: "Collection added successfully" });
        } catch (err) {
            return res.status(500).json({ code: 500, message: err.message });
        }
    })
})

router.get("/getUserCollection/:address",async (req,res) => {
    try{
        if(!req.params.address) return res.status(500).json({code:500,message:"Please fill required fields"});   
        
        const NFTCollections = await NFTCollection.find({address : req.params.address});
        if(!NFTCollections) return res.status(500).json({code:500,message:"No User Collection found!"});
        return res.status(200).json({code:200,message:NFTCollections});
    }catch(err){
        return res.status(500).json({code:500,message:err.message});
    }
});


module.exports = router;