export default class HttpService {
    _apiBase = 'http://localhost:5000/api';
    _request = async (url, method = "GET", body = null, headers = {}) => {
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json;charset=utf-8';
            }
            const response = await fetch(url, { method, body, headers });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something is went wrong!');
            }
            return data;
        } catch (e) {
            throw e;
        }
    }
    registerRequest = async (body) => {
        return await this._request(`${this._apiBase}/auth/register`, 'POST', body);
    }
    loginRequest = async (body) => {
        return await this._request(`${this._apiBase}/auth/login`, 'POST', body);
    }
    fetchAllEvents = async (token) => {
        return await this._request(`${this._apiBase}/event`, 'GET', null, {
            Authorization: `Bearer ${token}`
        });
    }
    removeRequest = async (id, token) => {
        return await this._request(`${this._apiBase}/event/remove/${id}`, 'delete', null, {
            Authorization: `Bearer ${token}`
        });
    }
    addEventRequest = async (body, token) => {
        return await this._request(`${this._apiBase}/event/add`, 'POST', body, {
            Authorization: `Bearer ${token}`
        });
    }
    requestJsonBlob = async (token) => {
        try {
            const response = await fetch(`${this._apiBase}/event?json=true`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            });
            if (!response.ok) {
                const data = response.json();
                throw new Error(data.message || 'Something is went wrong!');
            }
            return await response.blob();
        } catch (e) {
            throw e;
        }
    }
};