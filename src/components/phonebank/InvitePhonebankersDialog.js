import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField'
import { ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import { withFirebase } from 'react-redux-firebase';
import {compose } from 'redux'
import sendInvitations from '../../actions/sendInvitations'
import { connect } from 'react-redux'
import StyledLoadingBar from '../loading/StyledLoadingBar';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  textField: {
      margin: 20
  },
  list: {
      minWidth: 200,
      maxWidth: 350
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const validate = (email) => {
    return (/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(email))
}

function InvitePhonebankersDialog(props) {
  const classes = useStyles();
  const {open, handleClose} = props
  const [currentEmail, setCurrentEmail] = useState('')
  const [emails, setEmails] = useState([])
  const [error, setError] = useState(false)
  const lastIndex = emails.length - 1 

  function addEmail(e) {
    console.log('checking if enter...')
    if (e.key === 'Enter') {
        if (validate(currentEmail)) {
            e.preventDefault()
            if(!emails.includes(currentEmail)){
              setEmails([...emails, currentEmail])
            }
            setCurrentEmail('')
            setError(false)
        } else {
            setError(true)
        }
    }
  }

  function handleEmailChange(e) {
      setCurrentEmail(e.target.value)
  }

  function close() {
      console.log('closing')
      setEmails([])
      setCurrentEmail('')
      setError(false)
      handleClose()
  }

  function deleteEmail(email) {
    setEmails(emails.filter(it => it !== email))
  }

  function send() {
    props.sendInvitations(emails)
    .then(() => {
      close()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <Dialog fullScreen open={open} onClose={close} TransitionComponent={Transition}>

        <AppBar className={classes.appBar}>
        <StyledLoadingBar showFastActions scope="sendInvitations" color="secondary"  />

          <Toolbar>
            <IconButton onClick={close} edge="start" color="inherit" aria-label="Close">
              <CloseIcon  />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Invite Phonebankers
            </Typography>
            <Button color="inherit" onClick={send}>
              Send Invitations
            </Button>
          </Toolbar>
        </AppBar>

        <TextField
        error={error}
        id="outlined-helperText"
        label="Email"
        className={classes.textField}
        helperText="Press enter to add email"
        margin="normal"
        onKeyDown={addEmail}
        value={currentEmail}
        onChange={handleEmailChange} 
      />
        <List className={classes.list}>
        {emails.slice(0).reverse().map((email, i) => (
          <div>
            <ListItem button key={i}>
                <ListItemText primary={email} />
                <ListItemSecondaryAction>
                    <IconButton>
                        <DeleteIcon onClick={() => deleteEmail(email)}/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            {i !== lastIndex && <Divider/>}
            </div>
        ))}
        </List>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendInvitations: (emails) => dispatch(sendInvitations(emails))
  }
}

export default compose(
  withFirebase,
  connect(null, mapDispatchToProps),
)((InvitePhonebankersDialog))

