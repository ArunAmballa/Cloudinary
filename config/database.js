const mongoose=require("mongoose")
require("dotenv").config()
exports.dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true

    })
    .then(()=>{console.log("DB Connected Successfull")})
    .catch((err)=>{
        console.log("DB Connection Failed");
        process.exit(1);
    });
}