import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'

function App() {
  const [posts, setPost] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [currentPost, setCurrentPost] = useState(null)

  const addPost = () => {
    const newPost = { id: uuidv4(), title, description, image }
    setPost([...posts, newPost])
    setTitle('')
    setDescription('')
    setImage('')
  }

  const deletePost = (id) => {
    const post = posts.find((post) => post.id === id)
    setCurrentPost(post)
    setTitle(post.title)
    setDescription(post.description)
    setImage(post.image)
  }

  const updatePost = () => {
    setPost(
      posts.map((post) =>
        post.id === currentPost.id
          ? { ...currentPost, title, description, image }
          : post
      )
    )
    setTitle('')
    setDescription('')
    setImage('')
    setCurrentPost(null)
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0]
      setImage(URL.createObjectURL(img))
    }
  }

  return (
    <div className='app'>
      <h1 className='app-title'>My Blog</h1>
      <form className='app-form' onSubmit={(e) => e.preventDefault()}>
        <input
          className='app-input'
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className='app-input'
          type='text'
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type='file' onChange={onImageChange} />
        {currentPost ? (
          <button className='app-button' onClick={updatePost}>
            Update Post
          </button>
        ) : (
          <button className='app-button' onClick={addPost}>
            Add Post
          </button>
        )}
      </form>
      {posts.map((post) => (
        <div className='post' key={post.id}>
          <h2 className='post-title'>{post.title}</h2>
          <p className='post-description'>{post.description}</p>
          <img className='post-image' src={post.image} alt={post.title} />
          <button className='post-button' onClick={() => deletePost(post.id)}>
            Delete Post
          </button>
          <button className='post-button' onClick={() => updatePost(post.id)}>
            Edit Post
          </button>
        </div>
      ))}
    </div>
  )
}

export default App
