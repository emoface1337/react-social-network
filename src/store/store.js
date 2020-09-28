import { combineReducers, createStore } from 'redux'
import { profileReducer } from './reducers/profileReducer'
import { dialogsReducer } from './reducers/dialogsReducer'
import { sidebarReducer } from './reducers/sidebarReducer'
import { usersReducer } from './reducers/usersReducer'

const rootReducer = combineReducers({
    profileReducer,
    dialogsReducer,
    sidebarReducer,
    usersReducer
})
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store