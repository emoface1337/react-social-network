import {
    PROFILE_ADD_POST,
    PROFILE_SET_USER_IS_LOADING, PROFILE_SET_USER_PHOTO,
    PROFILE_SET_USER_PROFILE,
    PROFILE_SET_USER_STATUS,
    profileActionTypes
} from '../types'

type Post = {
    id: number,
    text: string
}

const initialState = {
    profile: null as object | null,
    posts: [
        { id: 1, text: 'Пост 1' },
        { id: 2, text: 'Пост 2' }
    ] as Array<Post>,
    status: null as string | null,
    isLoading: false as boolean
}

type stateType = typeof initialState

export const profileReducer = (state: stateType = initialState, action: profileActionTypes): stateType => {
    switch (action.type) {
        case PROFILE_ADD_POST: {
            const newPost = {
                id: Date.now(),
                text: action.payload
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        }

        case PROFILE_SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.payload,
                isLoading: false
            }
        }

        case PROFILE_SET_USER_STATUS : {
            return {
                ...state,
                status: action.payload
            }
        }

        case PROFILE_SET_USER_IS_LOADING: {
            return {
                ...state,
                isLoading: true
            }
        }

        case PROFILE_SET_USER_PHOTO: {
            return {
                ...state,
                profile: { ...state.profile, photos: action.payload }
            }
        }

        default:
            return state
    }
}
