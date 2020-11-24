import { combineReducers, createStore } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { enhancedStore } from '../middleware/core'

import { appReducer as app } from './app'
import { profileReducer as profile } from './profile'
import { dialogsReducer as dialogs } from './dialogs'
import { usersReducer as users } from './users'
import { authReducer as auth } from './auth'

const rootReducer = combineReducers({
    app,
    profile,
    dialogs,
    users,
    auth,
    form: formReducer
})

const store = createStore(rootReducer, enhancedStore)

export type RootState = ReturnType<typeof rootReducer>

export default store
