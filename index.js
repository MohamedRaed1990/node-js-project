const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/Article")
require("dotenv").config();
const app = express();

app.use(express.json());
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected To mongoDB Successfully");
}).catch((error)=>{
    console.log("Error Connected To mongoDB",error);
})



app.get("/hello",(req,res)=>{
    let num = "";
    for(i=0;i<100;i++){
        num+=i+" ";
    }
    res.send(num);

})
app.get("/test",(erq,res)=>{
    res.send("you are in test")
})
app.get("/",(req,res)=>{
    res.send("Hello in Node Js Project")
})
app.put("/commit",(req,res)=>{
    res.send("Hello in Node Js ")
})
app.delete("/testingDelete",(req,res)=>{
    res.send("delete request ")
})
app.get("/totalTwoNumbers/:number1/:number2",(req,res)=>{
    const num1 = req.params.number1;
    const num2 = req.params.number2;
    const total = Number(num1)+Number(num2)
    console.log(total);
    res.send(`final total: ${total}`)
})

app.get("/sayHello",(req,res)=>{
    console.log(req.query.age)

    res.send(`final total: ${req.body.name}`)
})

app.get("/sayHi",(req,res)=>{
    console.log(req.body.name);
    

    res.json({
        name:req.body.name
    })
})
app.get("/numbers",(req,res)=>{
    
    // res.sendFile(__dirname + "/views/numbers.html")
    res.render("numbers.ejs",{
        name:"Mohamad Raed"
    });
})

//write on db
app.post("/article",async(req,res)=>{
    const newArticle = new Article();
    const artTitle=req.body.articleTitle;
    const artBody =req.body.articleBody;
    newArticle.title = artTitle;
    newArticle.body = artBody;
    newArticle.numberOfLikes = 100;

    await newArticle.save();
    res.json(newArticle);
})

//read from db
app.get("/article",async(req,res)=>{
    const articles = await Article.find();
    console.log(articles);
    res.json(articles);
})

//read from db specific article
app.get("/article/:articleID",async(req,res)=>{
    const id = req.params.articleID;
    console.log(id);
    const article = await Article.findById(id);
    res.json(article);
})


app.delete("/article/:articleID",async(req,res)=>{
    const id = req.params.articleID;
    console.log(id);
    const article = await Article.findByIdAndDelete(id);
    
    res.json(article);
})

app.patch("/article/:articleID",async(req,res)=>{
    const id = req.params.articleID;
    console.log(id);
    const updateArticle = await Article.findByIdAndUpdate(id,{
        title:"Updated By Mohamad Raed",
        body:"This Body is Updated ",
        numberOfLikes:55
    });
    updateArticle.save();
    res.json(updateArticle);
})

app.get("/",async(req,res)=>{
    const articles = await Article.find();
    res.render("articles.ejs",{
        allArticles : articles
    });
})


app.listen(3000,()=>{
    console.log("I am Listening from port 3000");
})
