import React from 'react'

const Window = ({ children, visible = true, title = '[YOUR TITLE HERE]', onClose = null, translate = true }) => (
    <div className={`ui window${visible ? '' : ' hidden'}${translate ? ' translate' : ''}`}>
        <div className="window-header">
            <div className="window-title">
                {title}
            </div>
            {onClose === null ? (<></>) : (<div onClick={onClose} className="window-close">X</div>)}
        </div>
        <div className="window-container">
            {children}
        </div>
    </div>
)

export default Window