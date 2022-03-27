const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const NFT = require("../models/NFT_info");

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


// INSERT A NFT
router.post("/add", (req, res) => {
    // store file
    upload(req, res, async (err) => {

        try {
            console.log(req);
            // validate request
            if (!req.file) {
                return res.status(404).json({ code: 500, message: "All fields are required." });
            }

            if (err) return res.status(500).json({ code: 500, message: err.message });

            const nft = new NFT({
                name: req.body.name,
                description: req.body.description,
                path: "/uploads/" + req.file.filename,
                tokenId: req.body.tokenId,
                price: req.body.price,
                royalities: req.body.royalities,
                ownerAddress: req.body.address,
                creatorAddress: req.body.address,
            });

            const response = await nft.save();
            return res.status(200).json({ code: 200, message: "NFT Created successfully" });
        } catch (err) {
            return res.status(200).json({ code: 500, message: err.message });
        }
    })
})

// GET THE SINGLE NFT BY ID
router.get("/get-one/:id", async (req, res) => {
    try {
        const OneNFT = await NFT.findOne({ tokenId: req.params.id });

        if (!OneNFT) return res.status(500).json({ code: 500, error: "No NFT found!" });

        return res.status(200).json({ code: 200, message: OneNFT });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
    if (!req.params.id) return res.status(500).json({ error: "Please provide a details" });

})

// GET THE ALL NFTs
router.get("/get-all/", async (req, res) => {
    try {
        const OneNFT = await NFT.find();

        if (!OneNFT) return res.status(500).json({ error: "No NFT found!" });

        return res.status(200).json({ code: 200, message: OneNFT });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
    if (!req.params.id) return res.status(500).json({ error: "Please provide a details" });

})

// CHANGE OWNER AFTER BUYING NFT    
router.post("/changeOwner", async (req, res) => {
    // store file    
    console.log(req.body);
    if(!req.body) return res.status(500).json({code:500,message:"Please provider required parameters"});
    const response = await NFT.updateOne(
        { tokenId: req.body.tokenID },
        { $set:
            {
                resell: req.body.resell,
                ownerAddress:req.body.address
            }
        }
        );
    console.log(response);
    return res.status(200).json({ code: 200, message: "Buy NFT successfully" });        
})

module.exports = router;