import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

import { profileReducer } from './reducers/profileReducer'
import { dialogsReducer } from './reducers/dialogsReducer'
import { sidebarReducer } from './reducers/sidebarReducer'
import { usersReducer } from './reducers/usersReducer'
import { authReducer } from './reducers/authReducer'

const rootReducer = combineReducers({
    profileReducer,
    dialogsReducer,
    sidebarReducer,
    usersReducer,
    authReducer,
    form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store