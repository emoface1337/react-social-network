import { types } from '../types'

const initialState = {
    users: [
        {
            id: 777,
            photoUrl: 'https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg',
            followed: false,
            fullName: 'Vasya',
            status: 'Я новый чувак тут',
            location: { city: 'Киев', country: 'Украина' }
        },
        {
            id: 666,
            photoUrl: 'https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg',
            followed: false,
            fullName: 'Anya',
            status: 'Делаю ноготочки',
            location: { city: 'Москва', country: 'Россия' }
        },
        {
            id: 333,
            photoUrl: 'https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg',
            followed: true,
            fullName: 'Yana',
            status: 'Купила машину!',
            location: { city: 'Санкт-Петербург', country: 'Россия' }
        }
    ]
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.users.FOLLOW: {
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.payload) {
                        return { ...user, followed: true }
                    }
                    return user
                })
            }
        }

        case types.users.UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.payload) {
                        return { ...user, followed: false }
                    }
                    return user
                })
            }
        }

        case types.users.SET_USERS: {
            return {
                ...state,
                users: [...state.users, ...action.payload]
            }
        }
        default:
            return state
    }
}