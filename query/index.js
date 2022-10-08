const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json())
app.use(cors());

const posts = {}

const handleEvent = (type,data)=>{
    if(type === 'PostCreated'){
        const {id,title} = data
        posts[id] = {id,title,comments:[]}
    }
    if(type === 'CommentCreated'){
        const {id,content,postId,status} = data;
        const post = posts[postId]
        post.comments.push({id,content,status})
    }
    
    if(type==='CommentUpdated'){
        console.log('type===CommentUpdated',data)
        const {id,content,postId,status} = data
        const post = posts[postId]
        
        const comment =  post.comments.find((comment,index)=>{
            return comment.id === id
        })
        console.log("comment====>",comment);
        comment.status = status
        comment.content = content
    }
}

app.get('/posts',(req,res)=>{
    res.send(posts)
})

app.post('/events',(req,res)=>{
        const {type,data} = req.body

        handleEvent(type,data)

        console.log(posts.comments)
        res.send({})
})

app.listen(4002,async()=>{
    try{
        console.log('Listening on 4002')
        const res = await axios.get('http://localhost:4005/events')

        for(let event of res.data){
            console.log('Processing',event.data)
            handleEvent(event.type,event.data)
        }
    }catch(err){
        console.log(err)
    }
   
})