const API_BASE = 'https://facebookapi-1.onrender.com/api/posts'

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

export const fetchPosts = async () => {
  const res = await fetch(API_BASE)
  return handleResponse(res)
}

export const fetchPost = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`)
  return handleResponse(res)
}

export const createPost = async (post) => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  })
  return handleResponse(res)
}

export const updatePost = async (id, post) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  })
  return handleResponse(res)
}

export const patchPost = async (id, partial) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(partial)
  })
  return handleResponse(res)
}

export const deletePost = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
  return handleResponse(res)
}