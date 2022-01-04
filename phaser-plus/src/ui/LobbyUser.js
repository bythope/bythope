import React from 'react'
import Color, { toHex } from '../Color'

/**
 * @typedef LobbyUserOptions
 * @property {boolean} rtl
 * @property {import('../Color').ColorType} indicatorColor 
 * @property {string} avatarUrl
 * @property {string} primaryText
 * @property {string} secondaryText
 */

/**
 * 
 * @param {LobbyUserOptions} param0 
 */
const LobbyUser = ({ rtl = false, indicatorColor, avatarUrl = null, primaryText = '[PRIMARY TEXT]', secondaryText = '[SECONDARY TEXT]' }) => {
    
    let indicatorColorHex = toHex(indicatorColor)

    const Avatar = avatarUrl === null ? (<></>) : (<div className="item avatar"><img src={avatarUrl} /></div>)

    return (
        <div className={`ui lobby-user${rtl ? ' rtl' : ''}`}>
            {Avatar}
            <div className="item text">
                <div className="item-text-primary">{primaryText}</div>
                <div className="item-text-secondary">{secondaryText}</div>
            </div>
            <div className="item indicator">
                <div className="indicator-circle" style={{ background: indicatorColorHex }}></div>
            </div>
        </div>
    )
}

export default LobbyUser