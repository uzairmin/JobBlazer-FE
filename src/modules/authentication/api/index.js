import { http, rawHttp } from '@utils/http'
import { saveToken, saveRefreshToken } from '@utils/helpers'

export const loginUser = (email, password) =>
    rawHttp
        .post('api/auth/login/', { email, password })
        .then(res => {
            saveToken(res.data.access)
            saveRefreshToken(res.data.refresh)
            return { status: 'success', message: 'User logged in successfully!' }
        })
        .catch(({ response }) => ({ status: 'error', message: response.data.detail }))

export const sendResetPasswordLink = email =>
    http.get(`api/auth/password/reset?email=${email}`).then(({ data }) => ({ status: 'success', message: data.detail }))

export const resetPassword = (password, confirm_password, email, code) =>
    http
        .post(`api/auth/password/reset`, { password, confirm_password, email, code })
        .then(({ data }) => ({ status: 'success', message: data.detail }))
