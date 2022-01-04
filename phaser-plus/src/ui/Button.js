import Color, { toHex } from '../Color'
import React from 'react'

/**
 * @typedef ButtonOptions
 * @property {Function} onClick
 * @property {('prime'|'cool'|'basic')} type
 * @property {import('../Color').ColorType} color
 * @property {string} label
 * @property {boolean} dynamic 
 */


/**
 * 
 * @param {ButtonOptions} param0
 */
const Button = ({ onClick, type = 'prime', color = 'black', label = '[YOUR TEXT HERE]', dynamic = false }) => {
    
    if (!(type === 'prime' || type === 'cool' || type === 'basic')) {
        type = 'basic'
    }

    const style = {}

    if (type === 'basic') {
        style.background = toHex(color)
    }

    return (
        <div onClick={onClick} style={style} className={`ui btn btn-${type}${dynamic ? ' dynamic' : ''}`}>
            {label}
        </div>
    )

}

export default Button