import { addComponent, getEntityComponents, hasComponent, IWorld, removeComponent } from 'bitecs'
import { GameObjects } from 'phaser'
import Component from './Component'

class Entity {

    /**
     * @type {number}
     */
    id = null

    /**
     * @type {GameObjects.GameObject}
     */
    gameObject = null

    /**
     * @private
     * @type {IWorld}
     */
    world = null
    
    /**
     * 
     * @param {IWorld} world 
     * @param {number} id 
     * @param {GameObjects.GameObject | null} gameObject 
     */
    constructor(world, id, gameObject) {
        this.world = world
        this.id = id
        this.gameObject = gameObject
    }

    get components() {
        return getEntityComponents(this.world, this.id)
    }

    /**
     * 
     * @param {Component} component 
     */
    addComponent(component) {
        return addComponent(this.world, component.data, this.id)
    }

    /**
     * 
     * @param {Component} component 
     */
    getComponent(component) {
        return component.getProxy(this.id)
    }

    /**
     * 
     * @param {Component} component 
     * @returns {boolean}
     */
    hasComponent(component) {
        return hasComponent(this.world, component.data, this.id)
    }

    /**
     * @param {Component} component 
     * @returns 
     */
    removeComponent(component) {
        return removeComponent(this.world, component.data, this.id, true)
    }

}

export default Entity