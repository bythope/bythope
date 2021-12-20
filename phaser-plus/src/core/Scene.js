import { Loader, Scene as PhaserScene } from 'phaser'
import { Logger } from '@bythope/utils'
import ModuleRegister from './ModuleRegister'
import ServiceRegister from './ServiceRegister'
import { formatByteSize } from '@bythope/utils'

class Scene extends PhaserScene {

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
     * @type {Logger}
     */
    logger = null

    /** @protected */
    onInit() {}

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
        this.onInit()
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
        this.onStart()
        this.logger.info('scene started')
    }

    /**
     * @private
     */
    update() {
    }

    /**
     * @private
     * 
     */
    destroy() {
        for (let key of this.modules.keys) {
            this.modules.get(key).dispose()
        }
        this.modules.destroyAll()
        this.logger.info('All modules disposed')
        this.onDispose()
        this.logger.info('scene disposed')
    }

}

export default Scene