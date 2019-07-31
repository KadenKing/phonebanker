import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux';
import { connect } from 'react-redux'
import acceptInvitation from '../../actions/acceptInvitation'

class FirestoreInvitations extends Component {
    static contextTypes = {
        store: PropTypes.object.isRequired
      }

      static propTypes = {
        render: PropTypes.func.isRequired
      }

    deleteInvitation = (id) => {
        const {firestore} = this.context.store
        firestore.collection('invites').doc(id).delete();
    }

    acceptInvitation = (id) => {
        console.log({id})
        this.props.acceptInvitation(id)
        .then(response => {
            alert('good!')
        })
        .catch(err => {
            console.error(err)
        })
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
                firestore.collection('invites').doc(id).update({read: true})
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
                {this.props.render(output, this.deleteInvitation, this.acceptInvitation)}
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

const mapDispatchToProps = (dispatch) => {
    return {
        acceptInvitation: (id) => dispatch(acceptInvitation(id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(FirestoreInvitations)