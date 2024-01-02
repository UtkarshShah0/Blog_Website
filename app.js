
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
var _ = require('lodash');
const { find } = require("lodash");

const homeStartingContent = "Welcome to My Daily Journal Embrace the art of daily reflection and self-expression with My Daily Journal. Our platform is designed to be your digital sanctuary—a place where you can pour your thoughts onto virtual pages, capturing the nuances of your life's journey. Discover the therapeutic power of writing as you chronicle your experiences, aspirations, and moments of inspiration. Each entry becomes a piece of your personal narrative, a snapshot of who you are at this moment in time. Explore the compose page to craft your daily musings, and revisit past entries to witness your evolution. Our intuitive interface lets you focus on what truly matters—your words. Start your journey today, and let My Daily Journal be your companion on the path of self-discovery.";
const aboutContent = "About My Daily Journal At My Daily Journal, we believe that writing is a bridge to your inner world. Our mission is to empower you to cultivate mindfulness, clarity, and growth through the simple act of putting pen to paper—or in this case, fingers to keyboard. Created by a team of passionate writers and developers, My Daily Journal offers a safe haven for your thoughts. We understand that life is a tapestry woven from countless threads, and your daily entries are the threads that contribute to the masterpiece of your life. Whether you're an artist seeking inspiration, an adventurer charting unexplored territories, or a seeker on a quest for self-awareness, My Daily Journal is here to accompany you on your journey. Navigate through the various sections of the journal, from the compose page where your words come to life, to the 'Contact' page, where you can connect with us and fellow journal enthusiasts. Your story matters. Let My Daily Journal be the canvas on which you paint your thoughts and emotions.";
const contactContent = "Contact Us Have a question, suggestion, or just want to share your journaling experience? We're all ears! Reach out to us and we'll get back to you as soon as possible. Our team is dedicated to enhancing your journaling journey. Your insights and feedback are invaluable in shaping My Daily Journal into a space that resonates with your needs. As you continue to explore the profound impact of daily writing, remember that you're part of a vibrant community of individuals who value introspection, growth, and the beauty of storytelling. Welcome to the My Daily Journal family!";

const app = express();

app.set('view engine', 'ejs');

mongoose.connect("mongodb://127.0.0.1:27017/blogDB",
                {useUnifiedTopology: true, 
                useNewUrlParser: true })

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const blogSchema = new mongoose.Schema({
  title: String,
  content: String
})

const Blog = mongoose.model("blog", blogSchema )


//get
app.get("/", function(req,res){

  find()
  async function find(){
    const posts = await Blog.find()
    res.render("home", {startingContent : homeStartingContent,
                      posts : posts,})
  }
})

app.get("/about", function(req,res){
  res.render("about", {content : aboutContent})
})

app.get("/contact",function(req,res){
  res.render("contact", {content : contactContent })
})

app.get("/compose", function(req,res){
  res.render("compose")
})

app.get("/posts/:postId", function(req,res){
  const requestedPostId = req.params.postId

  find()
  async function find (){
    const post = await Blog.findOne({_id: requestedPostId})
    res.render("post",{Title : post.title,
                         Content : post.content })
  }
})



//post
app.post("/compose", function(req,res){
  
    // title: req.body.postTitle,
    // content: req.body.postBody
  
  const blog = new Blog({
    title: req.body.postTitle,
    content: req.body.postBody
    })
  blog.save()

  console.log("Success")

  res.redirect("/")
  
})









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
