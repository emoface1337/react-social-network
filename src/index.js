import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { createMuiTheme, ThemeProvider } from '@material-ui/core'

import App from './App'

import store from './ducks'

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#fdd835',
            light: '#ffff6b',
            dark: '#c6a700',
            contrastText: '#000000'
        },
        secondary: {
            main: '#039be5',
            light: '#63ccff',
            dark: '#006db3',
            contrastText: '#ffffff'
        }
    }
})

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
)
