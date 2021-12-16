import { GameObjects, Loader, Scene as PhaserScene } from 'phaser'
import Component from '../ecs/Component'
import Engine from '../ecs/Engine'
import Entity from '../ecs/Entity'
import System from '../ecs/System'
import Logger from './Logger'
import ModuleRegister from './ModuleRegister'
import ServiceRegister from './ServiceRegister'
import formatByteSize from '../utils/formatByteSize'

class Scene extends PhaserScene {

    /**
     * @type {number}
     */
    maxEntity = 100

    stats = {
        assets: {
            files: 0,
            loadingTime: 0,
            size: 0
        }
    }

    /**
     * @type {ModuleRegister}
     */
    modules = null

    /**
     * @type {ServiceRegister}
     */
    services = null

    /**
     * @private
     * @type {Engine}
     */
    engine = null

    /**
     * @type {Logger}
     */
    logger = null

    /** @protected */
    onCreate() {}

    /** @protected */
    onLoad() {}

    /**
     * @protected
     */
    onStart() {}

    /**
     * @protected
     */
    onDispose() {}

    /**
     * 
     * @param {string} key 
     */
    goTo(key) {
        this.destroy()
        this.scene.stop()
        this.game.scene.start(key)
    }

    /**
     * 
     * @param {GameObjects.GameObject} gameObject 
     * @returns {Entity}
     */
    createEntity(gameObject = null) {
        return this.engine.createEntity(gameObject)
    }

    /**
     * 
     * @param  {...Entity} entities 
     * @returns {void}
     */
    removeEntity(...entities) {
        return this.engine.removeEntity(...entities)
    }

    /**
     * 
     * @param  {...Component} components 
     * @returns {void}
     */
    defineComponent(...components) {
        return this.engine.define(...components)
    }

    /**
     * 
     * @param {System} system 
     * @returns {void}
     */
    addSystem(system) {
        return this.engine.addSystem(system)
    }


    /**
     * @private
     */
    init() {
        this.logger = Logger.getLogger(`scene=${this.scene.key}`)
        this.modules = new ModuleRegister(this, this.game)
        
        if (typeof this.game.services === 'undefined') {
            this.game.services = new ServiceRegister(this.game)
        }

        
        this.services = this.game.services
        
        this.logger.info('Initialized!')
        this.engine = new Engine(this)
        this.onCreate()
    }

    /**
     * @private
     */
    preload() {
        this.onLoad()
        /** @type {Array.<Loader.File>} */
        const files = []
        for (let key of this.modules.keys) {
            const module = this.modules.get(key)
            module.onLoad()
            
            this.load.list.each(file => {
                if (typeof file.module === 'undefined') {
                    file.module = key
                    files.push(file)
                }
            })
        }

        if (files.length === 0) {
            this.logger.info('there is no assets for loading!')
        }

        const startLoadingTime = new Date().getTime()
        this.load.once(Loader.Events.COMPLETE, () => {
            let bytes = 0
            for (let file of files) {
                bytes += file.bytesLoaded
            }
            this.stats.assets.size = formatByteSize(bytes)
            this.stats.assets.files = files.length
            this.stats.assets.loadingTime = new Date().getTime() - startLoadingTime
            this.logger.info(`asset loading files=(${this.stats.assets.files}) size=(${this.stats.assets.size}) time=(${this.stats.assets.loadingTime} ms)`)
        })
    }

    /**
     * @private
     */
    create() {
        for (let key of this.modules.keys) {
            this.modules.get(key).init()
        }
        this.logger.info(`Loaded modules: [${this.modules.keys.join(', ')}]`)
        this.engine.run()
        this.onStart()
        this.logger.info('scene started')
    }

    /**
     * @private
     */
    update() {
        this.engine.update()
    }

    /**
     * @private
     * 
     */
    destroy() {
        for (let key of this.modules.keys) {
            this.modules.get(key).dispose()
        }
        this.engine.dispose()
        this.modules.destroyAll()
        this.logger.info('All modules disposed')
        this.onDispose()
        this.logger.info('scene disposed')
    }

}

export default Scene