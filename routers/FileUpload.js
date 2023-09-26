const express=require("express")
const router=express.Router();

const {videoUpload,dataUpload,imageUpload,imageSizeReducer,localFileUpload}=require("../controllers/fileUpload");

router.post("/imageUpload",imageUpload)
router.post("/localFileUpload",localFileUpload)
router.post("/videoUpload",videoUpload)
router.post("/dataUpload",dataUpload)
router.post("/imageSizeReducer",imageSizeReducer)
module.exports=router;
