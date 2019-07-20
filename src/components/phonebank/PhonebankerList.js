import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import PhonebankerItem from './PhonebankerItem'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}));

const PhonebankerList = (props) => {
	const classes = useStyles()
	const { phonebankers } = props
	const lastIndex = phonebankers.length - 1

	return (
		<div>
			<List className={classes.root}>
				{
					phonebankers.map((banker, i) => {
						return (
							<div>
								<PhonebankerItem phonebanker={banker} />
								{i !== lastIndex && <Divider component="li" />}
							</div>
						)
					})
				}
			</List>
		</div>
	)
}

export default PhonebankerList