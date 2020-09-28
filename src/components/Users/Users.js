import React from 'react'
import { connect } from 'react-redux'
import { followUser, setUsers, unfollowUser } from '../../store/actions/usersActions'

import './Users.sass'

const Users = (props) => {
    return (
        <div className="content__users">
            {
                props.users.map(user => (
                    <div key={user.id} className="user">
                        <div className="user__left">
                            <img src={user.photoUrl} alt={user.fullName} className="user__left-avatar"/>
                            {
                                user.followed ? <button className="user__left-button"
                                                        onClick={() => props.unfollow(user.id)}>Отписаться</button> :
                                    <button className="user__left-button"
                                            onClick={() => props.follow(user.id)}>Подписаться</button>
                            }
                        </div>
                        <div className="user__center">
                            <div className="user__center-fullname">{user.fullName}</div>
                            <div className="user__center-status">{user.status}</div>
                        </div>
                        <div className="user__right">
                            <p>{user.location.city}</p>
                            <p>{user.location.country}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

const UsersContainer = ({ users, follow, unfollow }) => {
    return <Users users={users} follow={follow} unfollow={unfollow}/>
}

const mapStateToProps = state => ({
    users: state.usersReducer.users
})

const mapDispatchToProps = dispatch => ({
    follow: userId => dispatch(followUser(userId)),
    unfollow: userId => dispatch(unfollowUser(userId)),
    setUsers: users => dispatch(setUsers(users))
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)