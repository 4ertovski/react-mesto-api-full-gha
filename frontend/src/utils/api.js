class Api {
    constructor({baseUrl, headers }) {
        this._baseUrl = baseUrl;
        /* this._headers = headers; */
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
    getUserInfo(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers:{
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(this._handleResponse)
    }


    // получение серверных карточек
    getInitialCards(token) {
        return fetch(`${this._baseUrl}/cards`, {
                headers:{
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            }
        )
            .then(this._handleResponse)
    }

    //установка данных профиля
    patchUserProfile(data, token) {
        return fetch(`${this._baseUrl}/users/me`,
            {
                method: 'PATCH',
                headers:{
                    "Content-Type": "application/json",
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
    patchAvatar(avatar, token) {
        return fetch(`${this._baseUrl}/users/me/avatar`,  {
            method: 'PATCH',
            headers:{
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                /*avatar: avatar.link*/
                avatar: avatar.avatar
            })
        })
            .then(this._handleResponse)
    }

    postUserCard(item, token) {
        return fetch(`${this._baseUrl}/cards`,  {
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: item.name,
                link: item.link
            })
        })
            .then(this._handleResponse)
    }

    // лайк
    putLike(id, token) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'PUT',
                headers:{
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            }
        )
            .then(this._handleResponse)
    }

    // удалить лайк
    deleteLike(id, token) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'DELETE',
                headers:{
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            }
        )
            .then(this._handleResponse)
    }

    // удалить карточку
    deleteCard(id, token) {
        return fetch(`${this._baseUrl}/cards/${id}`,  {
                method: 'DELETE',
            headers:{
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            }
        )
            .then(this._handleResponse)
    }
}
export const api = new Api({ baseUrl:'https://api.liholesie.nomoredomains.rocks',
    /* headers: {
        authorization: '3aa61c49-fdf8-469f-ac89-ecfdfa4ec988',
        'Content-Type': 'application/json'
    } */
});

export default api;