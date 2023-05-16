import { privateAPI } from './axiosConfig'

const user = {
    url: '/api/admin/user',
    getAll(params) {
        return privateAPI.get(this.url, { params })
    },
    create(data) {
        return privateAPI.post(this.url, data)
    },
    update(id, data) {
        return privateAPI.put(`${this.url}/${id}`, data)
    },
    delete(data) {
        return privateAPI.delete(this.url, { data })
    },
    changePassword(id, newPassword) {
        return privateAPI.put(`${this.url}/${id}/changepassword`, newPassword)
    },
}

const role = {
    getAll() {
        return privateAPI.get('/api/admin/role')
    },
}

const movie = {
    url: '/api/admin/movie',
    getAll(params) {
        return privateAPI.get(this.url, { params })
    },
    create(data) {
        return privateAPI.post(this.url, data, { headers: { 'Content-Type': 'multipart/form-data' } })
    },
    update(id, data) {
        return privateAPI.put(`${this.url}/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
    },
    delete(data) {
        return privateAPI.delete(this.url, { data })
    },
}

const food = {
    url: '/api/admin/food',
    getAll(params) {
        return privateAPI.get(this.url, { params })
    },
    create(data) {
        return privateAPI.post(this.url, data, { headers: { 'Content-Type': 'multipart/form-data' } })
    },
    update(id, data) {
        return privateAPI.put(`${this.url}/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
    },
    delete(data) {
        return privateAPI.delete(this.url, { data })
    },
}

const adminAPI = { user, role, movie, food }

export default adminAPI
