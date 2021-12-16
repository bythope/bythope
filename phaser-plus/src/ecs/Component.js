import { Component as ComponentData, defineComponent, IWorld } from 'bitecs'
import { v4 as uuid } from 'uuid'

/**
 * 
 * @param {ComponentData} component 
 * @returns 
 */
const proxyHandler = (entityId, component) => {
    return {
        get: (_, prop) => {
            if (typeof component[prop] === 'undefined') {
                return undefined
            }
            return component[prop][entityId]
        },
    
        set: (target, prop, value) => {
            if (typeof component[prop] === 'undefined') {
                throw new ReferenceError(`${prop} is not defined, component schema=(${JSON.stringify(target)})`)
            }
            component[prop][entityId] = value
            return component[prop][entityId]
        }
    }
}

class Component {

    /**
     * @type {string}
     */
    id = null

    /**
     * @type {Object.<string,string>}
     */
    schema = null

    /**
     * @private
     * @type {Object.<string,Array.<any>>}
     */
    data = null

    /**
     * @private
     * @type {Map.<number,Proxy>}
     */
    proxies = null

    constructor(schema) {
        this.id = uuid()
        this.schema = schema
        this.proxies = new Map()
    }

    /**
     * @private
     * @param {number} entityId 
     */
    getProxy(entityId) {
        if (!this.proxies.has(entityId)) {
            const proxy = new Proxy(this.schema, proxyHandler(entityId, this.data))
            this.proxies.set(entityId, proxy)
        }
        return this.proxies.get(entityId)
    }

    /**
     * @private
     * @param {IWorld} world 
     */
    define() {
        console.log(this.schema)
        this.data = defineComponent(this.schema)
    }

    /**
     * @private
     */
    dispose() {
        this.proxies.clear()
    }
}

/**
 * 
 * @param {Object.<string,('i8' | 'ui8' | 'ui8c' | 'i16' | 'ui16' | 'i32' | 'ui32' | 'f32' | 'f64')>} schema 
 */
Component.define = (schema) => {
    return new Component(schema)
}

export default Component