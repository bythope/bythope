import React from 'react'

const Section = ({ children, visible = true, offsetX = 0, offsetY = 0, width = 0, height = 0, debug = false, dimmer = false }) => (
    <div style={{ 
        top: offsetY,
        left: offsetX,
        width: width,
        height: height
     }} className={`ui section${debug ? ' debug' : ''}${dimmer ? ' dimmer' : ''}${visible ? '' : ' hidden'}`}>
        {children}
    </div>
)

export default Section