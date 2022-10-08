const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.post('/events',async(req,res)=>{
    try{
        const {type,data} = req.body

        if(type=== 'CommentCreated'){
            const status = data.content.includes('orange') ? 'rejected':'approved'
            await axios.post('http://localhost:4005/events',{
                type:'CommentModerated',
                data:{
                    id:data.id,
                    postId:data.postId,
                    status,
                    content:data.content
                }
            })
        }
            res.send({})

    }catch(err){
            console.log(err)
    }
})


app.listen(4003,()=>{
    console.log('listenning on 4003');
})