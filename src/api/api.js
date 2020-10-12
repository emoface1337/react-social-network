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
    }
}