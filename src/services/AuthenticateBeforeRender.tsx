import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Tokens from "../dtos/tokens";
import User from "../dtos/user";

export default function AuthenticateBeforeRender(props: any) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        authenticate().then(auth => {
            setIsAuthenticated(auth)
        })
    })

    return (
        props
    )
}

export const getAccessToken = () => Cookies.get('access_token')
export const getRefreshToken = () => Cookies.get('refresh_token')
export const isAuthenticated = () => !!getAccessToken()

export const authenticate = async () => {
  if (getRefreshToken()) {
    try {
      const tokens = await refreshTokens()

      const expireLength = 60 * 60 * 1000
      const expireTime = new Date(new Date().getTime() + expireLength)

      Cookies.set('access_token', tokens.accessToken, { expires: expireTime });
      Cookies.set('refresh_token', tokens.refreshToken);

      return true
    } catch(error) {
        redirectToLogin()
        return false
    }
  }

  redirectToLogin()
  return false
}

function refreshTokens(): Tokens {
    // const requestOptions = {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username: username })
    //   }
    
    //   fetch('http://localhost:8080/login/', requestOptions)
    //     .then(response => response.json())

    return {
        accessToken: "",
        refreshToken: ""
    }
}

function redirectToLogin() {
    return  window.location.replace("http://localhost:3000/");
}

export function setAccessToken(token: string) {
    const expireLength = 60 * 60 * 1000
      const expireTime = new Date(new Date().getTime() + expireLength)

      Cookies.set('access_token', token, { expires: expireTime });
}

export function getCurrentUser(setUser: any) {
    let accessToken = Cookies.get("access_token");

    if (!accessToken) {
        return
    }

    let requestOptions = {
        method: "GET",
        headers: { "Authorization": `Bearer ${accessToken}` }
    }

    // {"data":{"id":25,"username":"test6","score":0}
    fetch("http://localhost:8080/api/admin/user", requestOptions)
        .then((response) => response.json())
        .then((parsedResponse) => setUser(parsedResponse.data))
}

