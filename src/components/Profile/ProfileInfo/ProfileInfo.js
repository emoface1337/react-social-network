import React from 'react'

import PersonIcon from '@material-ui/icons/Person'
import { Typography, Box, makeStyles } from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import Button from '@material-ui/core/Button'

import ProfileStatus from '../ProfileStatus/ProfileStatus'
import { useDispatch } from 'react-redux'
import { profileActions } from '../../../store/actions'

const useStyles = makeStyles(() => ({
    profile: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '25px'
    },
    profilePhoto: {
        width: '260px',
        marginRight: '25px',
        '& > img': {
            width: '100%'
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    profilePhotoImage: {
        width: '100%',
        marginBottom: '15px'
    },
    profileHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
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
    },
    input: {
        display: 'none'
    },
    button: {
        width: '100%',
        fontSize: '14px',
        lineHeight: '14px',
        letterSpacing: '0px'
    }
}))

const ProfileInfo = ({ profile, status, currentUserId, userId }) => {

    const classes = useStyles()

    const dispatch = useDispatch()

    const uploadPhoto = e => {
        if (e.target.files.length) {
            const file = e.target.files[0]
            dispatch(profileActions.updateUserPhoto(file))
        }
    }

    return (
        <Box className={classes.profile}>
            <Box className={classes.profilePhoto}>
                {
                    profile.photos.large
                        ? <img src={profile.photos.large} alt={profile.fullName}
                               className={classes.profilePhotoImage}/>
                        : <PersonIcon className={classes.profileIcon}/>
                }
                {
                    currentUserId === userId
                        ? <>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="photoUpload"
                                type="file"
                                onChange={e => uploadPhoto(e)}
                            />
                            <label htmlFor="photoUpload">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<PhotoCamera/>}
                                    component="span"
                                >
                                    Загрузить фото
                                </Button>
                            </label>
                        </>
                        : null
                }
            </Box>
            <Box className={classes.profileInfo}>
                <Box className={classes.profileHeader}>
                    <Typography variant="h4">{profile.fullName}</Typography>
                    <Box>
                        <Typography component="span">Ищет работу: </Typography>
                        <Typography component="span">{profile.lookingForAJob ? 'Да' : 'Нет'}</Typography>
                    </Box>
                </Box>
                <ProfileStatus status={status} currentUserId={currentUserId} userId={userId}/>
                {
                    profile.aboutMe
                        ? <Typography paragraph={true} className={classes.profileAbout}>Обо
                            мне: {profile.aboutMe}</Typography>
                        : null
                }
            </Box>
        </Box>
    )
}

export default ProfileInfo
