import React, { useState } from 'react'

export default function PostItem({ post, onEdit, onPatch, onDelete }) {
  const [expanded, setExpanded] = useState(false)

  const handleLikeToggle = async () => {
    // This UI does a simple optimistic update by patching a "liked" boolean.
    // Your backend doesn't have a liked field by default — if you add it,
    // this will call PATCH /api/posts/:id with { liked: true/false }.
    if (!onPatch) {
      alert('Patch not enabled in API or UI')
      return
    }
    try {
      await onPatch({ liked: !post.liked })
    } catch (err) {
      alert('Failed to update like: ' + (err.message || err))
    }
  }

  return (
    <article className="post">
      <div className="post-header">
        <strong>{post.author || 'Unknown'}</strong>
        <time title={post.createdAt}>
          {new Date(post.createdAt).toLocaleString()}
        </time>
      </div>

      {post.imageUrl && (
        <div className="post-image">
          <img src={post.imageUrl} alt="post" onError={(e) => e.target.style.display = 'none'} />
        </div>
      )}

      <div className="post-content">
        <p>{expanded ? post.content : (post.content?.slice(0, 300) || '')}</p>
        {post.content && post.content.length > 300 && (
          <button className="link-btn" onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      <div className="post-actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={handleLikeToggle}>{post.liked ? 'Unlike' : 'Like'}</button>
        <button onClick={onDelete} className="danger">Delete</button>
        <div className="muted">Modified: {new Date(post.modifiedAt).toLocaleString()}</div>
      </div>
    </article>
  )
}