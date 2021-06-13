import {useEffect, useState} from 'react';
import { DataStore, withSSRContext } from 'aws-amplify'
import { Post } from '../../src/models'
import Markdown from 'react-markdown'
import { useRouter } from 'next/router'

export default function PostComponent({ id }) {
  const router = useRouter()
  const [post, setPost] = useState('');
  useEffect(() => {
    fetchPost()
    async function fetchPost() {
      const postData = await DataStore.query(Post, id)
      setPost(postData)
    }
  }, [id])
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <Markdown children={post.content} />
    </div>
  )
}

export async function getStaticPaths(req) {
  const { DataStore } = withSSRContext(req)
  const posts = await DataStore.query(Post)
  const paths = posts.map(post => ({ params: { id: post.id }}))
  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps (req) {
  const { params } = req
  const { id } = params

  return {
    props: {
      id
    },
    revalidate: 1
  }

}