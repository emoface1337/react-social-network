import { types } from '../types'

const initialState = {
    profile: null,
    posts: [
        { id: 1, text: 'Пост 1' },
        { id: 2, text: 'Пост 2' }
    ]
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.profile.ADD_POST: {
            const newPost = {
                id: Date.now(),
                text: action.payload
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        }
        case types.profile.SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.payload
            }
        }
        default:
            return state
    }
}