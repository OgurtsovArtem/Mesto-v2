
'use strict'
class Api {
    constructor(options) {
        this.options = options;
      // тело конструктора
    }
    getInitialUser(){
        return fetch(`${this.options.baseUrl}/users/me`, {
            method: 'GET',
            headers: {
              authorization: this.options.headers.authorization,
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            // если ошибка, переходим в catch
            return Promise.reject(`Ошибка: ${res.status}`);
          })

    }

    getInitialCards() {
        return fetch(`${this.options.baseUrl}/cards`, {
            method: 'GET',
            headers: {
              authorization: this.options.headers.authorization,
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            // если ошибка, переходим в catch
            return Promise.reject(`Ошибка: ${res.status}`);
          })

    }
    patchUser(name, about){
      return fetch(`${this.options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
              authorization: this.options.headers.authorization,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              about: about
            })
          })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            // если ошибка, переходим в catch
            return Promise.reject(`Ошибка: ${res.status}`);
          })
    }
    addCard (name, link) {
      return fetch(`${this.options.baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: this.options.headers.authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
        .then (res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`)
        })
    }
    removeCard(id) {
      return fetch(`${this.options.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: this.options.headers.authorization,
          'Content-Type': 'application/json'
        },
      })

    }
    cardLike() {

    }


}
const api = new Api({
  baseUrl: 'https://praktikum.tk/cohort10',
  headers: {
    authorization: 'b2e45f82-b0bc-47b6-843e-5aa34606d315',
    'Content-Type': 'application/json'
  }
});