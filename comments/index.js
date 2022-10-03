const express = require('express')
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())
const commentsByPostId = {}

app.get('/posts/:id/comments',(req,res)=>{
    console.log(req.params.id)
     
    if(commentsByPostId[req.params.id]){
        return res.status(200).json({
            commentsByPostId
        })
       
    } else{
        return res.status(404).json({
            status:404,
            message:"Not found"
        })
    }

       
})
app.post('/posts/:id/comments',(req,res)=>{
   const commentId = randomBytes(4).toString('hex') 
    const {content} = req.body;

    const comments = commentsByPostId[req.params.id] || []
    
    comments.push({id:commentId,content})

    commentsByPostId[req.params.id] = comments;

    res.status(201).json({
        comments
    })  


}) 

app.listen(4001,()=>{
    console.log('Comments service listening')
})

