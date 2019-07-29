import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux';
import { connect } from 'react-redux'
import Invitations from './Invitations';

class FirestoreInvitations extends Component {
    static contextTypes = {
        store: PropTypes.object.isRequired
      }

      static propTypes = {
        render: PropTypes.func.isRequired
      }

    componentDidMount() {
        this.query = {
            collection: 'invites',
            where: [
                ['recipientUid', '==', this.props.auth.uid],
            ]
        }
        const {firestore} = this.context.store
        firestore.setListener(this.query)
    }

    componentDidUpdate(prevProps) {
        if(prevProps === this.props) {
            return
        }

        const {invitations} = this.props
        const { firestore } = this.context.store
        if(invitations) {
            invitations.forEach(invitation => {
                const { id } = invitation
                firestore.collection('invites').doc(id).set({read: true}, {merge: true})
            })
        }
    }

    componentWillUnmount() {
        this.context.store.firestore.unsetListener(this.query)
    }
    
    render() {
        if(!this.props.invitations) {
            return null
        }
        const output = this.props.invitations.map(invite => ({
            ...invite,
            timestamp: invite.timestamp.toDate().toDateString()
        }))
        return (
            <div>
                {this.props.render(output)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase,
        invitations: state.firestore.ordered.invites
    }
}

export default compose(
    connect(mapStateToProps)
)(FirestoreInvitations)