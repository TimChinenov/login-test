import { getAccessToken, setAccessToken } from "../services/auth-service"
import { baseUrl } from "../services/environment"

export const createAccount = (username: string, password: string, confirmPassword: string): Promise<Response> => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password, confirmPassword: confirmPassword})
    }
  
    return fetch(`${baseUrl}/api/users`, requestOptions)
      .then(response => response.json())
}

export const login = (username: string, password: string) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password})
    }
  
    return fetch(`${baseUrl}/api/login`, requestOptions)
      .then(response => response.json())
      .then((data) => {
        setAccessToken(data.token)
      })
}

export const getPosts = async (page: number, pageCount: number) => {
  let token = getAccessToken()

  if (!token) {
    return Promise.resolve()
  }

  const requestOptions = {
    method: "GET",
    headers: { "Authorization": `Bearer ${token}` }
  }

  return fetch(`${baseUrl}/api/admin/posts/${page}/${pageCount}`, requestOptions)
    .then(response => response.json())
}

export const createPost = async (userId: number, body: string) => {
  let token = getAccessToken()

  if (!token) {
    return Promise.resolve()
  }

  const requestOptions = {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization":  `Bearer ${token}`
    },
    body: JSON.stringify({ userId: userId, body: body })
  }

  return fetch(`${baseUrl}/api/admin/posts`, requestOptions)
      .then(response => response.json())
}