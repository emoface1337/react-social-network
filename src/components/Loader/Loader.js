import React from 'react'
import { Box, CircularProgress } from '@material-ui/core'

const Loader = () => {
    return (
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 20px' }}>
            <CircularProgress size={100}/>
        </Box>
    )
}

export default Loader