import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Tokens from "../dtos/tokens";

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
    return {
      refreshToken: "",
      accessToken: ""
    }
}

function redirectToLogin() {
    return  window.location.replace("http://localhost:3000/");
}

