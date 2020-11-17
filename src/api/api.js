import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e4e32d41-becd-4647-8361-0e75d46dbd75'
    }
})

export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 12) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },

    followUser(userId) {
        return instance.post('follow/' + userId)
    },

    unfollowUser(userId) {
        return instance.delete('follow/' + userId)
    }
}

export const authAPI = {

    auth() {
        return instance.get('auth/me')
    },

    login(email, password, rememberMe) {
        return instance.post('auth/login', {
            email,
            password,
            rememberMe
        })
    },

    logout() {
        return instance.delete('auth/login')
    }
}

export const profileAPI = {

    getProfile(userId) {
        return instance.get('profile/' + userId)
    },

    getStatus(userId) {
        return instance.get('profile/status/' + userId)
    },

    updateStatus(newStatus) {
        return instance.put('profile/status', { status: newStatus })
    },

    updateUserPhoto(photo) {
        const formData = new FormData()
        formData.append('image', photo)
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}
