import BlogDetail from '@/components/BlogDetail'
import React from 'react'

const BlogPage = ({params} : {params : {
  id: string
}}) => {
  const id = params.id;
  // if(!id){
  //   return null;
  // }
  return (
    <div>
        <BlogDetail id={id}/>
    </div>
  )
}

export default BlogPage