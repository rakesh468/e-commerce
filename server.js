require('dotenv').config()
const express=require('express');
const cors=require('cors');
const fileUpload=require('express-fileupload');
const cookieParser = require('cookie-parser');
const userRouter=require('./routes/userRouter')
const categoryRouter=require("./routes/categoryRouter");
const uploadRouter=require("./routes/upload");
const productRouter=require("./routes/productRouter");
const paymentRouter=require("./routes/paymentRouter");
const path=require("path")

const connection = require("./db");

const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles:true
}))


//routes
app.use("/user",userRouter)
app.use("/api",categoryRouter)
app.use("/api",uploadRouter)
app.use("/api",productRouter)
app.use("/api",paymentRouter)

const PORT=process.env.PORT || 5000;
//connect mongodb
connection();


if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
    app.get("*",(request,response)=>{
        response.sendFile(path.join(__dirname,"client","build","index.html"))
    })
}

app.listen(PORT, () => console.log("App Running in",PORT));