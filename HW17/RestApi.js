class RestApi {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    getList() {
        return fetch(this._baseUrl).then((res) => res.json());
    }
    getOne(id) {
        return fetch(this._baseUrl + id).then((res) => res.json());
    }

    getByParam(param, value) {
        return fetch(`${this._baseUrl}?${param}=${value}`).then((res) => res.json());
    }

    create(data) {
        return fetch(this._baseUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());
    }
    update(data) {
        return fetch(this._baseUrl + data.id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());
    }
    delete(id) {
        return fetch(this._baseUrl + id, {
            method: 'DELETE',
        }).then((res) => res.json());
    }

}