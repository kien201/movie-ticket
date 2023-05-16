import axios from 'axios'
import { toast } from 'react-toastify'

function getAxios() {
    return axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

const publicAPI = getAxios()

const privateAPI = getAxios()
privateAPI.interceptors.response.use(null, (err) => {
    if (err.response.status === 401) {
        toast.error('Đã hết phiên đăng nhập')
    } else if (err.response.status === 403) {
        toast.error('Bạn không có đủ quyền để thực hiện hành động này')
    }
    return Promise.reject(err)
})

export { publicAPI, privateAPI }
