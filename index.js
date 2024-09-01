const express = require("express");
const app = express()
const port = 9191
const path = require('path')
app.set("view engine","ejs")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override")


app.use(methodOverride('_method'))


let posts = [{
    id:uuidv4(),
    username:"sandesh",
    content:"i love coding"
},{

    id:uuidv4(),
    username:"kiran",
    content:"i love sita"
}
,{

    id:uuidv4(),
    username:"sita",
    content:"i love milan"
}
,{

    id:uuidv4(),
    username:"milan",
    content:"i love kiran"
}
]


app.get('/posts',(req,res)=>{
    res.render('index',{posts})
})
app.get('/posts/new',(req,res)=>{
res.render('new')
})



app.get('/posts/:id',(req,res)=>{
    let {id} = req.params
console.log(id);
let post = posts.find((p)=>id ===p.id)

console.log(post)
res.render('show',{post})
})


app.patch('/posts/:id',(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content
    let post = posts.find((p)=>id ===p.id);
    post.content = newContent;
    console.log(id);
    console.log(newContent);
// res.render('edit',{post})
res.redirect('/posts')


})
app.get('/posts/:id/edit',(req,res)=>{
    let {id,username} = req.params;
    let post = posts.find((p)=>id ===p.id);
    console.log(id)
    res.render('edit',{post})

})

app.post('/posts',(req,res)=>{
    let {username , content} = req.body
    let id = uuidv4();
    posts.push({id,username,content})
    console.log(req.body)
res.redirect("/posts")
})
app.delete('/posts/:id',(req,res)=>{
    let {id} = req.params
    posts = posts.filter((p)=>id !==p.id);
  res.redirect('/posts')
})

app.listen(port,()=>{
    console.log('listen on' + port)
})