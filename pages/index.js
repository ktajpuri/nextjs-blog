// import styles from '../styles/Home.module.css'
import { DataStore } from 'aws-amplify'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Post } from '../src/models'

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
    async function fetchPosts() {
      const postData = await DataStore.query(Post)
      setPosts(postData)
    }
    const subscription = DataStore.observe(Post).subscribe(() => fetchPosts())
    return () => subscription.unsubscribe()
  }, [])
  
  return (
    <div>
      <h1>Posts</h1>
      {
        posts.map(post => (
          <Link href={`/posts/${post.id}`}>
            <a>
              <h2>{post.title}</h2>
            </a>
          </Link>
        ))
      }
    </div>
  )
}