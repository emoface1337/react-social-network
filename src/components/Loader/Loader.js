import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Box } from '@material-ui/core'

const Loader = () => {
    return (
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress size={100}/>
        </Box>
    )
}

export default Loader