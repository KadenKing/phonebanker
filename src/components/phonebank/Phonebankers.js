import React, { Component } from 'react'
import PhonebankerList from './PhonebankerList'
import Grid from '@material-ui/core/Grid'
import PhonebankersControls from './PhonebankersControls';

const tempBankers = [
    {
        firstName: 'Kaden',
        lastName: 'King',
    },
    {
        firstName: 'Madison',
        lastName: 'Hindo',
    }
]

export default class Phonebankers extends Component {
    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <PhonebankerList phonebankers={tempBankers} />

                    </Grid>
                    <Grid item xs={6}>
                       <PhonebankersControls/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
