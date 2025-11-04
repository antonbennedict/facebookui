import React, { useEffect, useState } from 'react'
import {
  fetchPosts,
  createPost,
  updatePost,
  patchPost,
  deletePost
} from './api'
import PostList from './components/PostList'
import PostForm from './components/PostForm'

export default function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null) // post being edited

  // Load all posts
  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchPosts()
      // ensure descending by createdAt
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setPosts(data)
    } catch (err) {
      setError(err.message || 'Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  // Create a new post
  const handleCreate = async (payload) => {
    try {
      const saved = await createPost(payload)
      // ensure saved has id and timestamps for UI rendering
      const postWithId = {
        id: saved.id || Date.now().toString(),
        createdAt: saved.createdAt || new Date().toISOString(),
        modifiedAt: saved.modifiedAt || new Date().toISOString(),
        liked: saved.liked || false,
        ...saved
      }
      setPosts(prev => [postWithId, ...prev])
    } catch (err) {
      throw err
    }
  }

  // Update a post
  const handleUpdate = async (id, payload) => {
    try {
      const saved = await updatePost(id, payload)
      setPosts(prev => prev.map(p => (p.id === id ? saved : p)))
      setEditing(null)
    } catch (err) {
      throw err
    }
  }

  // Patch a post (like toggle)
  const handlePatch = async (id, partial) => {
    try {
      const saved = await patchPost(id, partial)
      setPosts(prev => prev.map(p => (p.id === id ? saved : p)))
    } catch (err) {
      throw err
    }
  }

  // Delete a post
  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return
    try {
      await deletePost(id)
      setPosts(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      alert('Failed to delete: ' + (err.message || err))
    }
  }

  return (
    <div className="app">
      <header>
        <h1>Posts</h1>
      </header>

      <main>
        <section className="create">
          <h2>Create a post</h2>
          <PostForm
            onSubmit={async (values, reset) => {
              try {
                await handleCreate(values)
                reset()
              } catch (err) {
                alert('Create failed: ' + (err.message || err))
              }
            }}
          />
        </section>

        <section className="list">
          <h2>All posts</h2>
          {loading && <div className="muted">Loading...</div>}
          {error && <div className="error">Error: {error}</div>}

          <PostList
            posts={posts}
            onEdit={(post) => setEditing(post)}
            onPatch={handlePatch}
            onDelete={handleDelete}
          />

          {editing && (
            <div className="modal">
              <div className="modal-content">
                <h3>Edit post</h3>
                <PostForm
                  initial={editing}
                  onSubmit={async (values) => {
                    try {
                      await handleUpdate(editing.id, values)
                    } catch (err) {
                      alert('Update failed: ' + (err.message || err))
                    }
                  }}
                  onCancel={() => setEditing(null)}
                />
              </div>
            </div>
          )}
        </section>
      </main>

      <footer>
        <small>UI built with Vite + React — talks to /api/posts</small>
      </footer>
    </div>
  )
}
