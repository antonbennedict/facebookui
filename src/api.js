const API_BASE = 'https://facebookui-ujb5.onrender.com/api/posts'

async function handleResponse(res) {
  const contentType = res.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await res.json() : null
  if (!res.ok) {
    // Try to get message or error, fallback to statusText or generic message
    const errMsg = (data && (data.message || data.error)) || res.statusText || 'API error'
    const err = new Error(errMsg)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

export const fetchPosts = async () => {
  const res = await fetch(API_BASE, {
    mode: 'cors'
  })
  return handleResponse(res)
}

export const fetchPost = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    mode: 'cors'
  })
  return handleResponse(res)
}

export const createPost = async (post) => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  })
  return handleResponse(res)
}

export const updatePost = async (id, post) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  })
  return handleResponse(res)
}

export const patchPost = async (id, partial) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(partial)
  })
  return handleResponse(res)
}

export const deletePost = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    mode: 'cors'
  })
  return handleResponse(res)
}
