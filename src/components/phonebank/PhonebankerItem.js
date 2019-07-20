import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, makeStyles } from '@material-ui/core';


const styles = makeStyles(theme => ({
    avatar: {
        margin: 10,
    }
}))

const initial = (name) => {
    return name.charAt(0).toUpperCase()
}

const PhonebankerItem = (props) => {
    const classes = styles()
    const {firstName, lastName} = props.phonebanker   

    return (
        <div>
            <ListItem role={undefined} dense button>
                <ListItemIcon>
                    <Avatar className={classes.avatar}>{`${initial(firstName)}${initial(lastName)}`}</Avatar>
                </ListItemIcon>
                <ListItemText primary={`${firstName} ${lastName}`} />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="Comments">
                        <MoreVertIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </div>
    )
}

export default PhonebankerItem