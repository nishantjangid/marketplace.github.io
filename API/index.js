const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;

app.use(cors())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
app.use(express.json());  
app.use(express.static('public'));

const connectDB = require("./config/db");
connectDB();


app.use("/nft",require("./routes/nftInfo"));
app.use("/nft",require("./routes/User"));
app.use("/collection",require("./routes/Collection"));

app.listen(PORT,()=>{
    console.log(`You are alive at ${PORT}`);
})