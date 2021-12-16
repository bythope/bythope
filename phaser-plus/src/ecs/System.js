import { defineQuery, enterQuery, exitQuery } from 'bitecs'
import Component from './Component'
import Engine from './Engine'
import Entity from './Entity'

class System {

    /**
     * @readonly
     */
    type = null

    /**
     * @private
     */
    query = {
        /** @type {Function} */
        enter: null,

        /** @type {Function} */
        exit: null,

        /** @type {Function} */
        update: null
    }

    /**
     * 
     * @param {System.Type} type 
     * @param {Array.<Component>}
     */
    constructor(type = null, components = []) {
        this.type = type || System.Type.UPDATE
        this.setFilter(components)
    }

    /**
     * 
     * @param {Array.<Component>} components 
     */
    setFilter(components = []) {
        const data = components.map(compoentnt => compoentnt.data)
        this.query.update = defineQuery(data)
        this.query.enter = enterQuery(this.query.update)
        this.query.exit = exitQuery(this.query.update)
    }

    /**
     * @protected
     * @returns {boolean}
     */
    canProceed() {
        return true
    }

    /**
     * @protected
     * @param {Array.<Entity>} entities 
     */
    onEnter(entities) {}

    /**
     * @protected
     * @param {Array.<Entity>} entities 
     */
    onUpdate(entities) {}

    /**
     * @protected
     * @param {Array.<Entity>} entities 
     */
    onExit(entities) {}

    /**
     * @private
     * @param {Engine} engine
     */
    process = (engine) => {
        if (this.canProceed() !== true) {
            return
        }
        const enterList = this.query.enter(engine.world)
        const updateList = this.query.update(engine.world)
        const exitList = this.query.exit(engine.world)
        if (enterList.length !== 0) {
            this.onEnter(enterList.map(id => engine.entities.get(id)))
        }

        if (updateList.length !== 0) {
            this.onUpdate(updateList.map(id => engine.entities.get(id)))
        }

        if (exitList.length !== 0) {
            this.onExit(exitList.map(id => engine.entities.get(id)))
        }
    }
}


/** @enum {string} */
System.Type = {
    INTERVAL: 'INTERVAL',
    UPDATE: 'UPDATE'
}

export default System