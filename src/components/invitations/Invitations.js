import React from 'react'
import FirestoreInvitations from './FirestoreInvitations';
import MaterialTable from 'material-table'

const Invitations = (props) => {

    return (
      <div style={{ maxWidth: "100%" }}>

        <FirestoreInvitations render={(invitations, deleteInvitation, acceptInivitation) => (
          <div>
                  <MaterialTable
                  columns={[
                    { title: "First Name", field: "senderFirstName" },
                    { title: "Last Name", field: "senderLastName" },
                    { title: "Email", field: "senderEmail" },
                    { title: "Date", field: "timestamp"}

                  ]}
                  data={invitations}
                  actions = {[
                    {
                      icon: 'done',
                      tooltip: 'accept invitation',
                      onClick: (event, rowData) => acceptInivitation(rowData.id)
                    },
                    {
                      icon: 'delete',
                      tooltip: 'delete this invitation',
                      onClick: (event, rowData) => deleteInvitation(rowData.id)
                    }
                    
                  ]}
                  title="Invitations"
                /></div>
         ) }/> 


      </div>
    )
}

export default Invitations
