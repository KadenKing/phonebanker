import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'

import Badge from '@material-ui/core/Badge'
import MailIcon from '@material-ui/icons/Mail'
import { compose } from 'redux';
import { connect } from 'react-redux'
import { withFirestore, withFirebase, firestoreConnect } from 'react-redux-firebase';

class MessagesButton extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.query = {
      collection: 'invites',
      where: [
        ['recipientUid', '==', this.props.firebase.auth.uid]
      ]
    }

    const { firestore } = this.context.store
    firestore.setListener(this.query)
    
  }

  componentWillUnmount() {
    const { firestore } = this.context.store
    firestore.unsetListener(this.query)
  }

  // componentWillUnmount() {
  //   const { firestore } = this.context.store
  //   fire
  // }

  render() {
    console.log('render',this.props)
    const {invites} = this.props
    return (
      <div>
          <Badge badgeContent={invites ? invites.filter(invite => invite.read === false).length : 0} color="secondary">
            <MailIcon />
          </Badge>
      </div>
    )
  }
}

const connectStateToProps = (state) => {
  return {
    invites: state.firestore.ordered.invites,
    firebase: state.firebase,
    firestore: state.firestore
  }
}

export default compose(
  connect(connectStateToProps),
)(MessagesButton)