import axios from 'axios'
import React,{useState} from 'react'

const CommentsCreate = ({postId}) => {
    const [content,setContent] = useState('')

    const handleChange = (e)=>{
        setContent(e.target.value)
    }

    const onSubmit = async (e) =>{
        e.preventDefault()
        try{
            const res = await axios.post(`http://localhost:4001/posts/${postId}/comments`,{
                content
            })
            if(res.status === 200){
                setContent('')
            }
        }
        catch(err){
            console.log(err)
        }

    }

  return (
    <div>
    <form onSubmit={onSubmit}>
        <div className='form-group'>
            <label>New Coments</label>
            <input value={content} onChange={e=>handleChange(e)}
            className="form-control"/>
        </div>
        <button className='btn btn-primary'>Submit</button>
    </form>
    </div>
  )
}

export default CommentsCreate