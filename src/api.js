// Define base API URL — can come from your .env (VITE_API_BASE) or fallback to '/api/posts'
const API_BASE = import.meta.env.VITE_API_BASE || '/api'
const url = `https://facebookui-ujb5.onrender.com/`  // 👈 now all post APIs use this

async function handleResponse(res) {
  const contentType = res.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await res.json() : null

  if (!res.ok) {
    const err = new Error((data && (data.message || data.error)) || res.statusText || 'API error')
    err.status = res.status
    err.data = data
    throw err
  }

  return data
}

// === Posts API ===
export const fetchPosts = async () => {
  const res = await fetch(url)
  return handleResponse(res)
}

export const fetchPost = async (id) => {
  const res = await fetch(`${url}/${id}`)
  return handleResponse(res)
}

export const createPost = async (post) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  })
  return handleResponse(res)
}

export const updatePost = async (id, post) => {
  const res = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  })
  return handleResponse(res)
}

export const patchPost = async (id, partial) => {
  const res = await fetch(`${url}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(partial)
  })
  return handleResponse(res)
}

export const deletePost = async (id) => {
  const res = await fetch(`${url}/${id}`, { method: 'DELETE' })
  return handleResponse(res)
}
