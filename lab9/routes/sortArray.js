/*
Require express and express router as shown in lecture code and worked in previous labs.
Your server this week should not be doing any of the processing! Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the array sort page.

you just need one route to send the static homepage.html file
*/
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const upload = multer({})

router.route("/")
.get(async (req, res) => {
    res.sendFile(path.resolve('static/homepage.html'));
})
.post(upload.array('img'),async (req,res)=>{
    // if(req.files){
        console.log(req.files);
        const encoded=[];
        for(let i=0;i<req.files.length;i++){
            // console.log(req.files[i]);
            let mime = req.files[i].mimetype;
            let base = req.files[i].buffer.toString('base64');
            let url = "data:"+mime+";base64,"+base;
            encoded.push(url);
        };
        // encoded.push(req.file[0].buffer.toString('base64'));
        console.log(encoded);
        // console.log(req.files);
        // await images(req.files).then(
        //     imgbuf=>console.log(imgbuf)
        // )
        // var file = req.files.img;
        // var filename = file.encoding;
        // console.log(filename);
        // console.log(imgbuf);
    // }
    // console.log(imgbuf);
})


const images = async(e)=>{
    const imagebuf=[];
    for(let i=0;i<e.length;i++){
        const reader = new FileReader();
        reader.readAsDataURL(e[i]);
        reader.addEventListener("load", () => {
        imagebuf.push(reader.result);
        // console.log(imagebuf);
        });
    };
    return imagebuf;
}
module.exports=router;