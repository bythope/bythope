import { Game } from 'phaser'
import Module from './Module'
import Scene from './Scene'

class ModuleRegister {

    /**
     * @private
     * @type {Map.<string,Module>}
     */
    modules = null

    /**
     * @private
     * @type {Scene}
     */
    scene = null

    /**
     * @private
     * @type {Game}
     */
    game = null

    /**
     * 
     * @param {Scene} scene 
     */
    constructor(scene, game) {
        this.scene = scene
        this.game = game
        this.modules = new Map()
    }

    /**
     * @type {Array.<string>}
     */
    get keys() {
        let list = []
        for (let key of this.modules.keys()) {
            list.push(key)
        }
        return list
    }

    /**
     * 
     * @param {string} key 
     * @param {Function.<Module>} moduleClass
     * @param {Object.<string,string>} [options]
     * @returns {Module} 
     */
    register(key, moduleClass, options = {}) {
        /** @type {Module} */
        const module = new moduleClass(this.scene, this.game, key, options)
        this.modules.set(key, module)
        this.scene.add.existing(module)
        return module
    }

    /**
     * 
     * @param {string} key
     * @returns {Module} 
     */
    get(key) {
        return this.modules.get(key) || null
    }

    /**
     * 
     * @param {string} key 
     */
    destroy(key) {
        const module = this.get(key)
        if (module !== null) {
            module.destroy(true)
        }
        this.modules.delete(key)
    }

    destroyAll() {
        for (let key of this.keys) {
            this.destroy(key)
        }
    }

}

export default ModuleRegister