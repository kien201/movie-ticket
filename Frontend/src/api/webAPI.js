import { publicAPI } from './axiosConfig'

const user = {
    login(data) {
        return publicAPI.post('/login', data)
    },
    logout() {
        return publicAPI.post('/profile/logout')
    },
    getCurrentUser() {
        return publicAPI.get('/profile')
    },
}

const movie = {
    url: '/movie',
    getAll(params) {
        return publicAPI.get(this.url, { params })
    },
    getOne(slug) {
        return publicAPI.get(`${this.url}/${slug}`)
    },
    getShowtime(id, startTime) {
        return publicAPI.get(`${this.url}/${id}/showtime`, { params: { startTime } })
    },
}

const cinema = {
    url: '/cinema',
    getAll() {
        return publicAPI.get(this.url)
    },
    getShowtime(id, startTime) {
        return publicAPI.get(`${this.url}/${id}/showtime`, { params: { startTime } })
    },
}

function getUpload(url) {
    return process.env.REACT_APP_API_URL + '/static/upload/' + url
}

const webAPI = { getUpload, user, movie, cinema }

export default webAPI
