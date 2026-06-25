const express = require('express')
const multer = require('multer')
const uploadFile = require('./services/storage.service')
const postModel = require('./models/post.model')
const cors = require('cors')

const app = express()

app.use(
  cors({
    origin: [
        "http://localhost:5173",
        "https://posting-photos-lzhe.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.options("*", cors())

app.use(express.json())

// ADD THIS HERE
app.get("/", (req, res) => {
  res.send("Backend Working");
});

const upload = multer({storage:multer.memoryStorage()})


app.post("/create-post", upload.single("image"), async (req, res) => {

    console.log(req.body)
    console.log(req.file)


    const result = await uploadFile(req.file.buffer)
    
    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption
    })

    return res.status(201).json({
        message: "Post create successfully!",
        post
    })
})

app.get("/posts", async(req, res) => {

    const posts = await postModel.find()

    return res.status(200).json({
        message: "Posts fetch successfully",
        posts
    })
})
module.exports = app