import express from "express"
import bodyParser from "body-parser"
import _ from "lodash"
import * as db from "./db.js"


const exp = express()
const port = 3000

exp.use(bodyParser.urlencoded({extended : true}))
exp.use(express.static("public"))
exp.set("view engine", "ejs")

exp.get("/", (req, res)=>{
    db.Blog.find({}, (err,foundContents)=>{
       if(!err && foundContents){
        res.render("home", {
            blogs : foundContents 
            })
       } 
    })
})

exp.get("/about", (req, res)=>{
    db.Blog.findOne({title : 'About'}, (err, foundBlog)=>{
        if(!err){
            res.render("about", {aboutPost : foundBlog.post})
        }
    })
})

exp.get("/contact", (req, res)=>{
    db.Blog.findOne({title : 'Contact'}, (err, foundBlog)=>{
        if(!err){
            res.render("contact", {contactPost : foundBlog.post})
        }
    })
    
})

exp.get("/compose", (req, res)=>{
    res.render("compose")
})

exp.get("/posts/:postId", (req, res)=>{
    const postId = req.params.postId
    db.Blog.findOne({_id : postId}, (err, foundBlog)=>{
        if(!err && foundBlog){
            res.render("post", {
                title : foundBlog.title,
                post : foundBlog.post
            })
        }
        else{
            res.render("pageNotFound")
        }
    })
    })
 
exp.post("/compose", (req, res)=>{
    const blogTitle = _.capitalize(req.body.title)
    const blogbody = req.body.post

    const newPost = new db.Blog({
        title : blogTitle,
        post : blogbody
    })
    newPost.save((err)=>{
        if(!err){
            res.redirect('/')
        }
    })
    
})

exp.get("*", (req, res)=>{
    res.render("pageNotFound")

})

exp.listen(port || process.env.POST, ()=>{
    console.log(`The server is running on port ${port}`);
})
