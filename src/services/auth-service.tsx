import Cookies from "js-cookie";
import { baseUrl } from "./environment";

export const getAccessToken = () => Cookies.get('access_token')
export const isAuthenticated = () => !!getAccessToken()


export function setAccessToken(token: string) {
    const expireLength = 60 * 60 * 1000
      const expireTime = new Date(new Date().getTime() + expireLength)

      Cookies.set('access_token', token, { expires: expireTime });
}

export function redirectToLogin() {
    return  window.location.replace(`${baseUrl}/login`);
}

export function redirectToHome() {
    return  window.location.replace(`${baseUrl}/home`);
}

export function getCurrentUser() {
    let token = getAccessToken()

    if (!token) {
        return Promise.resolve()
    }

    let requestOptions = {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    }

    return fetch(`${baseUrl}/api/admin/user`, requestOptions)
        .then((response) => response.json())
        .then((parsedResponse) => {
            if (!parsedResponse) {
                redirectToLogin()
            }

            return parsedResponse.data
        })
}

