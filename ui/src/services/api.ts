import axios from 'axios'

const api = axios.create({baseURL: 'http://127.0.0.1:5000/'})

export const postData = async (user: string) => {
    const res = await api.post('recommendation/',{user})
    return res.data
}