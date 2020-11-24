import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const withAuthRedirect = (Component) => {

    const RedirectComponent = (props) => {
        if (!props.isAuth)
            return <Redirect to='/login'/>

        return <Component {...props}/>
    }

    return connect(mapStateToProps)(RedirectComponent)
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
})

export default withAuthRedirect
