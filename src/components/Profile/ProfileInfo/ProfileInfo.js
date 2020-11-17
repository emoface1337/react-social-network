import React from 'react'

import PersonIcon from '@material-ui/icons/Person'
import { Typography, Box, makeStyles } from '@material-ui/core'

import ProfileStatus from '../ProfileStatus/ProfileStatus'

const useStyles = makeStyles(() => ({
    profile: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '25px'
    },
    profilePhoto: {
        width: '150px',
        height: '150px',
        marginRight: '25px',
        '& > img': {
            width: '100%'
        }
    },
    profileIcon: {
        width: '150px',
        height: '150px'
    },
    profileInfo: {
        width: '100%'
    },
    profileAbout: {
        margin: '15px 0'
    }
}))

const ProfileInfo = ({ profile, status, currentUserId, userId }) => {

    const classes = useStyles()

    return (
        <Box className={classes.profile}>
            <Box className={classes.profilePhoto}>
                {
                    profile.photos.large ?
                        <img src={profile.photos.large} alt={profile.fullName}/>
                        :
                        <PersonIcon className={classes.profileIcon}/>
                }

            </Box>
            <Box className={classes.profileInfo}>
                <Typography variant="h4">{profile.fullName}</Typography>
                <ProfileStatus status={status} currentUserId={currentUserId} userId={userId}/>
                { profile.aboutMe ? <Typography paragraph={true} className={classes.profileAbout}>Обо мне: {profile.aboutMe}</Typography> : null }
            </Box>
        </Box>
    )
}

export default ProfileInfo
