import React from 'react'

const Button = ({ onClick, type = 'prime', label = '[YOUR TEXT HERE]', dynamic = false }) => (
    <div onClick={onClick} className={`basicui btn btn-${type}${dynamic ? ' dynamic' : ''}`}>{label}</div>
)

export default Button