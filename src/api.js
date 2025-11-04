
export const API_URL = 'https://facebookui-ujb5.onrender.com/api/posts'

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

export const fetchPosts = async (url = API_URL) => {
  const res = await fetch(url)
  return handleResponse(res)
}

export const fetchPost = async (url = API_URL, id) => {
  const res = await fetch(`${url}/${id}`)
  return handleResponse(res)
}

export const createPost = async (url = API_URL, post) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  })
  return handleResponse(res)
}

export const updatePost = async (url = API_URL, id, post) => {
  const res = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  })
  return handleResponse(res)
}

export const patchPost = async (url = API_URL, id, partial) => {
  const res = await fetch(`${url}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(partial)
  })
  return handleResponse(res)
}

export const deletePost = async (url = API_URL, id) => {
  const res = await fetch(`${url}/${id}`, { method: 'DELETE' })
  return handleResponse(res)
}
