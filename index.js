const express=require('express');
const fileUpload = require('express-fileupload');
const app=express();

require("dotenv").config()

//Middlewares
app.use(express.json())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
})); //we use this middleware to upload files to server.

const PORT=process.env.PORT

//Mount
const Upload=require("./routers/FileUpload");
app.use("/api/v1",Upload)

//Connect to DB
const db=require("./config/database")
db.dbConnect();

//Cloudinary Connect
const cloudinary=require("./config/cloudinary")
cloudinary.cloudinaryConnect();

app.listen(PORT,()=>{
    console.log(`Served Started at ${PORT}`);
})