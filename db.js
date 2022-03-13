const mongoose=require("mongoose");
const asyncHandler=require("./middleware/asynchandler");

module.exports=asyncHandler(async()=>{
    const connectionParams={
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    const connection=await mongoose.connect(process.env.MONGODB_URL,connectionParams)
    connection ?
    console.log("DataBase Connected")
    : console.log("DataBase Not Connected")

})