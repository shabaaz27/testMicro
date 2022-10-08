const express = require('express')
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors')
const axios = require('axios')

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
app.post('/posts/:id/comments',async(req,res)=>{
    try {
   const commentId = randomBytes(4).toString('hex') 
    const {content} = req.body;

    const comments = commentsByPostId[req.params.id] || []
    
    comments.push({id:commentId,content,status:'pending'})

    commentsByPostId[req.params.id] = comments;
       
   await axios.post('http://localhost:4005/events',{
        type:'CommentCreated',
        data:{
            id:commentId,
            content,
            postId:req.params.id,
            status:'pending'
        }
    })

    return res.status(201).json({
        comments
    }) 
}catch(err){
    return res.status(404).json({
        status:404,
        message:'Invalid'
    })
} 
}) 

app.post('/events',async(req,res)=>{
    console.log('Event Received',req.body.type)
   const {type,data} = req.body
    if(type === 'CommentModerated')
    {
        
        const {postId,id,status,content} = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find((comment) => {
            console.log(comment,"kkll")
            return comment.id == id
        })
        comment.status = status


    await axios.post('http://localhost:4005/events',{
        type:'CommentUpdated',
        data:{
            id,
            status,
            postId,
            content

        }
    })
   
}
res.send({})
   
})

app.listen(4001,()=>{
    console.log('Comments service listening')
})

