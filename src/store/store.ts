import { combineReducers, createStore } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { enhancedStore } from './middleware/core'

import {
    appReducer as app,
    profileReducer as profile,
    dialogsReducer as dialogs,
    sidebarReducer as sidebar,
    usersReducer as users,
    authReducer as auth
} from './reducers'

const rootReducer = combineReducers({
    app,
    profile,
    dialogs,
    sidebar,
    users,
    auth,
    form: formReducer
})

const store = createStore(rootReducer, enhancedStore)

export type dispatchType = typeof store.dispatch

export default store
