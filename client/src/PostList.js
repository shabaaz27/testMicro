import React,{useState,useEffect} from 'react'
import axios from 'axios';
import CommentsCreate from './CommentsCreate';
import CommentList from './CommentList';

const PostList = () => {
    const [posts,setPosts] = useState({})

    const fetchPost = async ()=>{ 
        try{
            const res = await axios.get('http://localhost:4000/posts')
            if(res.status === 200) {
                setPosts(res.data)
                
            }
        }
        catch(err){ 
            console.log(err)
        } 
    
    }

    useEffect(()=>{
        fetchPost()
    },[])

    const renderedPost = Object.values(posts).map(post=>{
        return <div className='card'
            key={post.id}
         style={{width:'30%',marginBottom:'20px'}}>
            <div className='card-body'>
                <h3>{post.title} </h3>
                <CommentList postId={post.id}/>
                <CommentsCreate postId={post.id}/>
            </div>
        </div>
    })

  return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
      {
        renderedPost
      }
      
    </div>
  )
}

export default PostList