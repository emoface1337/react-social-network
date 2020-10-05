import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { followUser, setCurrentPage, setLoading, setUsers, unfollowUser } from '../../store/actions/usersActions'

import './Users.sass'
import defaultUserAvatar from '../../assets/images/default-avatar.jpg'
import { NavLink } from 'react-router-dom'
import Loader from '../../Loader/Loader'

const Users = (props) => {

    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className="content__users">
            {
                props.isLoading ? <Loader/> :
                    <>
                        <div className="content__users-pages">
                            {
                                pages.map(pageNum => (
                                    <span key={pageNum}
                                          onClick={() => props.setCurrentPage(pageNum)}
                                          className={props.currentPage === pageNum ? 'selected' : ''}>{pageNum}</span>
                                ))
                            }
                        </div>
                        {
                            props.users.map(user => (
                                <div key={user.id} className="user">
                                    <div className="user__left">
                                        <NavLink to={'/profile/' + user.id}>
                                            <img
                                                src={user.photos.small !== null ? user.photos.small : defaultUserAvatar}
                                                alt={user.name} className="user__left-avatar"/>
                                        </NavLink>
                                        {
                                            user.followed ? <button className="user__left-button"
                                                                    onClick={() => props.unfollow(user.id)}>Отписаться</button> :
                                                <button className="user__left-button"
                                                        onClick={() => props.follow(user.id)}>Подписаться</button>
                                        }
                                    </div>
                                    <div className="user__center">
                                        <div className="user__center-name">{user.name}</div>
                                        <div className="user__center-status">{user.status}</div>
                                    </div>
                                    <div className="user__right">
                                        <p>{'user.location.city'}</p>
                                        <p>{'user.location.country'}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </>
            }
        </div>
    )
}

const UsersContainer = (props) => {

    const { currentPage, setUsers, pageSize, setLoading } = props

    useEffect(() => {
        setLoading()
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`)
            .then(({ data }) => setUsers(data))
    }, [currentPage, setUsers, pageSize, setLoading])

    return <Users {...props}/>
}

const mapStateToProps = state => ({
    users: state.usersReducer.users,
    pageSize: state.usersReducer.pageSize,
    totalUsersCount: state.usersReducer.totalUsersCount,
    currentPage: state.usersReducer.currentPage,
    isLoading: state.usersReducer.isLoading
})

const mapDispatchToProps = {
    followUser,
    unfollowUser,
    setUsers,
    setCurrentPage,
    setLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)