import { VoteResponse } from "../dtos/vote-response"
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
        if (!data.token) {
          return
        }
        
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

export const voteOnPost = async (postId: number, voteType: number): Promise<VoteResponse> => {
  let token = getAccessToken()

  if (!token) {
    return Promise.reject()
  }

  const requestOptions = {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization":  `Bearer ${token}`
    },
    body: JSON.stringify({ postId: postId, voteType: voteType })
  }

  return fetch(`${baseUrl}/api/admin/posts/vote`, requestOptions)
      .then(response => response.json())
}