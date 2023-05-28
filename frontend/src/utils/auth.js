export const BASE_URL = 'https://api.liholesie.nomoredomains.rocks';

/* const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}; */

export const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Error! : ${res.status}`)
    }
}

export const register = ( email, password ) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
       /* headers, */
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then(handleResponse)
};

export const authorize = ( email, password ) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
       /* headers, */
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then(handleResponse)
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        token
       /* headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        }, */
    })
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
        })
        .then(res => res)
}