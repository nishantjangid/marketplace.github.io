const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions))
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

app.listen(PORT,()=>{
    console.log(`You are alive at ${PORT}`);
})