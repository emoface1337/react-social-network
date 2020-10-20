import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

import {
    profileReducer as profile,
    dialogsReducer as dialogs,
    sidebarReducer as sidebar,
    usersReducer as users,
    authReducer as auth
} from './reducers'

const rootReducer = combineReducers({
    profile,
    dialogs,
    sidebar,
    users,
    auth,
    form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store