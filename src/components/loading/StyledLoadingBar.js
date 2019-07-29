import React from 'react'
import { makeStyles } from '@material-ui/core';
import LoadingBar from 'react-redux-loading-bar';

const useStyles = makeStyles(theme => ({
    base: {
        height: 3, 
        position: 'absolute',
    },
    primary: {
        backgroundColor: theme.palette.primary.main
    },
    secondary: {
        backgroundColor: theme.palette.secondary.main
    }
}))

const StyledLoadingBar = (props) => {
    const styles = useStyles()
    const {color, ...rest} = props
    const styleToApply = styles[color]

    return (
        <LoadingBar className={styleToApply + ' ' + styles.base} {...rest}  />
    )
}

export default StyledLoadingBar