import { createWorld, IWorld, deleteWorld, addEntity, setDefaultSize, pipe, removeEntity } from 'bitecs'
import { GameObjects } from 'phaser'
import { Logger } from '@bythope/utils'
import Scene from '../core/Scene'
import Component from './Component'
import Entity from './Entity'
import System from './System'

class Engine {


    /**
     * @private
     * @type {boolean}
     */
    locked = false

    /**
     * @private
     * @type {Map.<string,Component>}
     */
    componentMap = new Map()

    /**
     * @private
     * @type {Logger}
     */
    logger = null

    /**
     * @private
     * @type {Scene}
     */
    scene = null

    /**
     * @private
     * @type {IWorld}
     */
    world = null

    /**
     * @private
     * @type {Array.<System>}
     */
    systems = []

    /**
     * @private
     * @type {Map.<number,Entity>}
     */
    entities = new Map()

    /**
     * @private
     */
    pipelines = {
        update: [],
        interval: []
    }

    /**
     * 
     * @param {Scene} scene 
     */
    constructor(scene) {
        this.scene = scene
        setDefaultSize(this.scene.maxEntity)
        this.logger = Logger.getLogger(`scene=${scene.scene.key} scope=engine`)
        this.world = createWorld()
        this.logger.info(`world initialized! entity limit=(${this.scene.maxEntity})`)
    }

    /**
     * 
     * @param {...Component} components
     */
    define(...components) {
        for (let component of components) {
            if (this.componentMap.has(component.id)) {
                throw new Error(`component=(${JSON.stringify(component.schema)}) is already defined!`)
            }
            this.componentMap.set(component.id, component)
            component.define()
        }
    }

    /**
     * 
     * @param {System} system 
     */
    addSystem(system) {
        if (this.locked) {
            throw new Error('systems can be added before scene start event')
        }
        this.systems.push(system)
    }

    /**
     * 
     * @param {GameObjects.GameObject | null} gameObject 
     * @returns {Entity}
     */
    createEntity(gameObject = null) {
        const id = addEntity(this.world)
        const entity = new Entity(this.world, id, gameObject)
        this.entities.set(id, entity)
        return entity
    }

    /**
     * 
     * @param  {...Entity} entities 
     */
    removeEntity(...entities) {
        for (let entity of entities) {
            const id = entity.id
            this.entities.delete(id)
            removeEntity(this.world, id)
        }
    }

    /**
     * @private
     */
    run() {
        for (let system of this.systems) {
            if (system.type === System.Type.UPDATE) {
                this.pipelines.update.push(pipe(system.process))
            } else if (system.type === System.Type.INTERVAL) {
                this.pipelines.interval.push(pipe(system.process))
            } else {
                throw new Error(`invalid system type=(${system.type})`)
            }
        }
        
        this.locked = true
        this.logger.info('system registered!')
    }

    /**
     * @private
     */
    update() {
        for (let pipeline of this.pipelines.update) {
            pipeline(this)
        }
    }

    /**
     * @private
     */
    dispose() {
        this.componentMap.forEach(component => {
            component.dispose()
        })
        deleteWorld(this.world)
    }

}

/** @enum {string} */
Engine.Types = {
    i8: 'i8',
    ui8: 'ui8',
    ui8c: 'ui8c',
    i16: 'i16',
    ui16: 'ui16',
    i32: 'i32',
    ui32: 'ui32',
    f32: 'f32',
    f64: 'f64'
}

export default Engine