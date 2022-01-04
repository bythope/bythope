import React from 'react'
import ReactDOM from 'react-dom'
import '@bythope/phaser-plus/lib/bundle.css'
import { UI } from '@bythope/phaser-plus'
ReactDOM.render(
  <React.StrictMode>
    <div className='ui-module' style={{ background: '#fff', width: '100%', height: '100%', pointerEvents: 'all' }}>
    <UI.Section width={800} height={500} offsetX={200} offsetY={50}>
      <UI.Window title="test">
       <UI.Button dynamic type="basic" color="green" />
      </UI.Window>
    </UI.Section>

    </div>
  </React.StrictMode>,
  document.getElementById('root')
)
