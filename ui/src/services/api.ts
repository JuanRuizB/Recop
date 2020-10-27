import axios from 'axios'


const api = axios.create({baseURL: 'http://127.0.0.1:5000/'})

export const putData = async (user: string) => {
    const res = await api.put('recommendation/',{user})
    return res.data
}

export const patchData = async (user: string, email: string, contraseña: string) => {
    const res = await api.patch('recommendation/',{user, email, contraseña})
    return res.data
}

export const getData = async (user: string) => {
    const res = await api.post('recommendation/',{user})
    return res.data
}

