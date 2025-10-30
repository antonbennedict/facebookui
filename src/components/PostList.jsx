import React from 'react'
import PostItem from './PostItem'

export default function PostList({ posts, onEdit, onPatch, onDelete }) {
  if (!posts || posts.length === 0) {
    return <div className="muted">No posts yet</div>
  }

  return (
    <div className="post-list">
      {posts.map(post => (
        <PostItem
          key={post.id}
          post={post}
          onEdit={() => onEdit?.(post)}
          onPatch={(partial) => onPatch?.(post.id, partial)}
          onDelete={() => onDelete?.(post.id)}
        />
      ))}
    </div>
  )
}