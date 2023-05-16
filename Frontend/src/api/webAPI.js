import { privateAPI, publicAPI } from './axiosConfig'

const user = {
    login(data) {
        return publicAPI.post('/login', data)
    },
    logout() {
        return publicAPI.post('/api/profile/logout')
    },
    getCurrentUser() {
        return publicAPI.get('/api/profile')
    },
}

function getStatic(url) {
    return process.env.REACT_APP_SERVER_STATIC_URL + '/upload/' + url
}

const webAPI = { user, getStatic }

export default webAPI
