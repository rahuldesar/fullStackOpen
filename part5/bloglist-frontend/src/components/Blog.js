import { useState } from 'react';

const Blog = ({blog, handleBlogUpdate, handleBlogRemove, user}) => {

  const blogStyle = {
    borderRadius: 10,
    borderColor: '#bab4b4',
    paddingTop: 10,
    paddingBottom: 8,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: 20,
    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
  }

  const flexContainer ={
    display: 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-around',

  }
  
  const btnStyle = {
    paddingLeft : 50,
    paddingRight : 50,
    marginLeft: 30,
  }

  const btnStyle2 = {
    paddingLeft : 30,
    paddingRight : 30,
    marginLeft: 30,
    paddingTop:5,
    paddingBottom:5,
  }


  const [showAll, setShowAll] = useState(false)

  const toggleVisibility = () => {
    setShowAll(!showAll)
  } 

  const handleLike = () =>{
    const newBlog ={
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.title,
    }
    handleBlogUpdate(blog.id, newBlog);
  }

  const handleRemove =() =>{
    handleBlogRemove(blog.id);
  }


  if(!showAll){
  return(
    <div style = { { ...blogStyle, ...flexContainer }}>
      <div>
      {blog.title} - {blog.author}
      </div>
      <button style={btnStyle} onClick= {toggleVisibility}> view </button>
    </div>  
  )
  } else {
    return(
      <div style = { { ...blogStyle, ...flexContainer }}>
        <div>
          {blog.title} - {blog.author}
        <div>{ blog.url }</div>
        <div>
          { blog.likes }
        <button style={btnStyle2} onClick={handleLike}> Like </button>
        </div>
        <div>{blog.user.username} - ( {blog.user.name } )</div>
        
        { user.username === blog.user.username? 
        <button style = {btnStyle} onClick={ handleRemove }> Remove </button>
            :
            <></>
      }
        
        
        </div>
        <button style={btnStyle} onClick= {toggleVisibility}> hide </button>
      </div>  
    )
  }
}

export default Blog