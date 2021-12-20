import React, { Component } from 'react'
import { BasicUI, ModuleUI, Scene, UI } from '@bythope/phaser-plus'

class TestUIWindow extends Component {
    render = () => (<BasicUI.Section debug width={200} height={200}>
        <BasicUI.Window title='test' ></BasicUI.Window>
    </BasicUI.Section>)
}

class TestWindow extends ModuleUI {

    onCreate() {
        this.render(TestUIWindow)
    }

}

class ReactScene extends Scene {

    onInit() {
        this.modules.register('test', TestWindow)
    }

    onStart() {

    }

}

export default ReactScene