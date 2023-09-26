const File=require("../models/File");
const { options } = require("../routers/FileUpload");
const cloudinary=require("cloudinary").v2;

exports.localFileUpload=async(req,res)=>{
    try{
        //fetch file
        const file=req.files.file;
        console.log(file);

        //Server Path
        let path=__dirname +"/files/"+Date.now()+`.${file.name.split('.')[1]}`;
        file.mv(path,(err)=>{
            console.log(err);
        })
        res.json({
            success:true,
            message:"Local File Uploaded Successfully"
        })
    }catch(err){
            console.log(err);
    }
}

function isFileSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options={folder}
    if (quality){
        options.quality=quality;
    }
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}
//Image Upload to Cloudinary

exports.imageUpload=async(req,res)=>{
    try{

        const {name,tags,email}=req.body;
        console.log(name,tags,email)

        const file=req.files.imageFile;
        console.log(file)

        //Validation
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if (!isFileSupported(fileType,supportedTypes)){
            res.status(400).json({
                success:false,
                Message:"File Format Not Supported"
            })
        }

        //If file format is supported
        const response=await uploadFileToCloudinary(file,"ArunAmballa");
        console.log(response)

        //Save Entry to DB

        const fileData=await File.create({
            name,tags,email,imageUrl:response.secure_url
        })

        res.json({
            success:true,
            Message:"Image Uploaded To Cloudinary Successfully"
        })

    }catch(err){
            return res.status(500).json({
                success:false,
                Message:"Error While Uploading Image to Cloudinary"
            })
    }
}

//Video Upload to Cloudinary

exports.videoUpload=async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email)

        const file=req.files.videoFile;
        console.log(file)

        //Validation
        const supportedTypes=["mp4","mov"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if (!isFileSupported(fileType,supportedTypes)){
            res.status(400).json({
                success:false,
                Message:"File Format Not Supported"
            })
        }
        const response=await uploadFileToCloudinary(file,"ArunAmballa");
        console.log(response)

        const fileData=await File.create({
            name,tags,email,imageUrl:response.secure_url
        })

        res.json({
            success:true,
            Message:"video Uploaded To Cloudinary Successfully"
        })


    }catch(err){
        res.status(500).json({
            success:false,
            Message:"Something went wrong while uploading  Video to Clodinary"
        })
    }
}

exports.dataUpload=async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        const responsed=await File.create({
            name,
            email,
            tags
        })
        res.status(200).json({
            success:true,
            Message:"Details Uploaded Succesfully"
        })
    }
    catch(err)
    {
        return res.json({
            success:false,
            Message:"Failed Details"
        })

    }
}

exports.imageSizeReducer=async(req,res)=>{
    try{

        const {name,tags,email}=req.body;
        console.log(name,tags,email)

        const file=req.files.imageFile;
        console.log(file)

        //Validation
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if (!isFileSupported(fileType,supportedTypes)){
            res.status(400).json({
                success:false,
                Message:"File Format Not Supported"
            })
        }

        //If file format is supported
        const response=await uploadFileToCloudinary(file,"ArunAmballa",30);
        console.log(response)

        //Save Entry to DB

        const fileData=await File.create({
            name,tags,email,imageUrl:response.secure_url
        })

        res.json({
            success:true,
            Message:"Image Uploaded To Cloudinary Successfully"
        })

    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            Message:"Something went wrong while uploading  Reduced Image to Clodinary"
        })
    }
}