import React, { useEffect, useState } from 'react'

export default function PostForm({ initial = null, onSubmit, onCancel }) {
  const [author, setAuthor] = useState(initial?.author || '')
  const [content, setContent] = useState(initial?.content || '')
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl || '')
  const [submitting, setSubmitting] = useState(false)

  // Only reset local state when the "initial" post changes (e.g. editing a different post).
  // Using initial?.id (or individual fields) avoids reacting to a new but empty object each render.
  useEffect(() => {
    setAuthor(initial?.author || '')
    setContent(initial?.content || '')
    setImageUrl(initial?.imageUrl || '')
  }, [initial?.id])

  const reset = () => {
    setAuthor('')
    setContent('')
    setImageUrl('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // minimal client-side guard: require author
    if (!author.trim()) {
      alert('Author is required')
      return
    }
    const payload = { author: author.trim(), content: content || '', imageUrl: imageUrl || '' }
    setSubmitting(true)
    try {
      await onSubmit(payload, reset)
      // if create was successful, reset inputs (onSubmit can call reset())
    } catch (err) {
      // bubble up error to caller
      throw err
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <label>
        Author
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
        />
      </label>

      <label>
        Content
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
        />
      </label>

      <label>
        Image URL (optional)
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://..."
        />
      </label>

      <div className="form-actions">
        <button type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Save'}</button>
        {onCancel && <button type="button" className="link-btn" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}