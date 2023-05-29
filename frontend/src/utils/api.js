export const BASE_URL = 'https://api.liholesie.nomoredomains.rocks';

class Api {
    constructor( config ) {
        this._baseUrl = config.baseUrl;
        // this._headers = config.headers;
    }

    // обработчик респонсов сервера
    _handleResponse(res){
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Error! : ${res.status}`)
        }

    }

    // получение начальных данных от пользователя
    getUserInfo() {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(this._handleResponse)
    }


    // получение серверных карточек
    getInitialCards() {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
            }
        )
            .then(this._handleResponse)
    }

    //установка данных профиля
    patchUserProfile(data) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/users/me`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: data.name,
                    about: data.about
                })
            })
            .then(this._handleResponse)
    }

    // смена аватара
    patchAvatar(avatar) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/users/me/avatar`,  {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                /*avatar: avatar.link*/
                avatar: avatar.avatar
            })
        })
            .then(this._handleResponse)
    }

    postUserCard(item) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/cards`,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: item.name,
                link: item.link
            })
        })
            .then(this._handleResponse)
    }

    changeLikeCardStatus(id, isLiked) {
        const token = localStorage.getItem("token");
        if (isLiked) {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }).then((res) => this._handleResponse(res));
        } else {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }).then((res) => this._handleResponse(res));
        }
    }

    // лайк
    /* putLike(id) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            }
        )
            .then(this._handleResponse)
    } */

    // удалить лайк
    /* deleteLike(id) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            }
        )
            .then(this._handleResponse)
    } */

    // удалить карточку
    deleteCard(id) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/cards/${id}`,  {
                method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            }
        )
            .then(this._handleResponse)
    }
}
export const api = new Api({ baseUrl: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
});

export default api;