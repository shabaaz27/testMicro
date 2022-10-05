import axios from 'axios';
import React,{useState,useEffect} from 'react';

const CommentList = ({postId}) => {
    const [comments,setComments] = useState([])

    const fetchData = async ()=>{
        try{
            const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
            setComments(res.data.commentsByPostId[postId])
            console.log(res.data.commentsByPostId[postId])
            
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    const renderedComments = comments.map(comment=>{

        return <li key={comment.id}> {comment.content}</li>
    })

  return (
    <ul>
        {renderedComments}
       
    </ul>
    
  )
}

export default CommentList