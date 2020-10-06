import React from 'react'

import PersonIcon from '@material-ui/icons/Person'
import { Typography, Box, makeStyles } from '@material-ui/core'

import Loader from '../../../Loader/Loader'

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
    profileInfo: {}
}))

const ProfileInfo = ({ profile }) => {

    const classes = useStyles()

    if (!profile) {
        return <Loader/>
    }

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
                <Typography paragraph={true}>{profile.aboutMe}</Typography>
            </Box>
        </Box>
    )
}

export default ProfileInfo