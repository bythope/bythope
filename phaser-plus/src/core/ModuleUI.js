import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { GameObjects } from 'phaser'
import Module from './Module'


class ModuleUI extends Module {

    /**
     * @type {GameObjects.DOMElement}
     */
    container = null

    /**
     * @type {Component}
    */
    component = null

    constructor(scene, game, key, options) {
        super(scene, game, key, options)
        this.container = this.scene.add.dom(0, 0, 'div')
        this.container.setClassName(`ui-module key-${this.key}`)
        this.container.setOrigin(0)
        this.add(this.container)
    }

    dispose() {
        super.dispose()
        this.component = null
        const unmounted = ReactDOM.unmountComponentAtNode(this.container.node)
        if (unmounted) {
            this.logger.debug('react deattached from the ui module container')
        }
    }

    /**
     * 
     * @param {Function.<Component>} ComponentClass 
     */
    render(ComponentClass) {
        ReactDOM.unmountComponentAtNode(this.container.node)
        ReactDOM.render(<ComponentClass ref={ref => this.component = ref} />, this.container.node)
    }

    /**
     * @protected
     * @param {HTMLElement} htmlElement
     * @param {string} key 
     * @param {number} [frame]
     */
    renderTexture(htmlElement = null, key, frame = 0) {
        if (htmlElement === null) {
            this.logger.warning(`passed HTMLElement for rendering texture=(${key}) frame=(${frame}) inside is null`)
            return
        }
        const texture = this.game.textures.get(key)
        if (texture === null) {
            return null
        }
        const textureSource = texture.source[frame] || null
        if (textureSource === null) {
            return null
        }
        const image = textureSource.source
        htmlElement.append(image)
    }

    /**
     * 
     * @param {string} selector 
     * @param {string} [type=id] 
     * @returns {HTMLElement | null}
     */
    getHTMLElement(selector, type = 'id') {
        if (type === 'id') {
            return this.container.getChildByID(selector) || null
        } else if (type === 'name') {
            return this.container.getChildByName(selector) || null
        } else {
            this.logger.warning(`wrong selector type=(${type}), available types [id, name]`)
            return null
        }
    }
}

export default ModuleUI