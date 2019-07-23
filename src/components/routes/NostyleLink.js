import React from 'react'
import {Link} from 'react-router-dom'

const NostyleRoute = (props) => {
    const { to } = props

    return (
        <div>
            <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
                {props.children}
            </Link>
        </div>
    )
}

export default NostyleRoute