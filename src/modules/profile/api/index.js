import { http, rawHttp } from '@utils/http'
import { toast } from 'react-hot-toast'

export const fetchProfile = url => http.get(url).then(({ data }) => ({ profile: data, status: 'success' }))

export const updateProfile = (url, { arg: profile }) =>
    rawHttp.put(url, profile).then(({ data }) => toast.success(data.detail || 'Profile updated successfully'))

export const updatePassword = (url, { arg: passwords }) =>
    rawHttp.post(url, passwords).then(({ data }) => toast.success(data.detail || 'Password updated successfully'))

export const updateAvatar = (url, { arg: file }) =>
    rawHttp.put(url, file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
