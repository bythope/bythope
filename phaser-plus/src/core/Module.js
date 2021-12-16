import { Events, Game, GameObjects } from 'phaser'
import Logger from './Logger'
import Scene from './Scene'

class Module extends GameObjects.Container {

    /**
     * @callback ActionListener
     * @param {any} data
     * @param {Container}
     */

    /**
     * @type {Game}
     */
    game = null

    /**
     * @type {string}
     */
    key = null

    /**
     * @protected
     * @type {Scene}
     */
    scene = null

    /**
     * @private
     * @type {Events.EventEmitter}
     */
    events = null

    /**
     * @protected
     * @type {Logger}
     */
    logger = null

    /**
     * 
     * @param {Scene} scene 
     * @param {Game} game
     * @param {string} key
     * @param {Object.<string,string>} [options]
     * 
     */
    constructor(scene, game, key, options = {}) {
        super(scene, 0, 0)
        this.game = game
        this.key = key
        this.options = options
        this.logger = Logger.getLogger(`module=${key}`)
        this.scene = scene
        this.events = new Events.EventEmitter()
    }

    /**
     * @protected
     * @param {Object.<string,string>} [options]
     */
    onLoad(options) {}

    /**
     * @protected
     * @param {Object.<string,string>} [options]
     */
    onCreate(options) {}

    /**
     * @protected
     */
    onDispose() {}
 
    /**
     * @private
     */
    init() {
        this.onCreate()
    }

    /**
     * @private
     */
    dispose() {
        this.onDispose()
    }

    /**
     * 
     * @param {string} event 
     * @param {ActionListener} listener 
     * @param {any} [context] 
     * @returns {this}
     */
    bind(event, listener, context) {
        this.events.addListener(event, listener, context)
        return this
    }

    /**
     * 
     * @param {string} event 
     * @param {ActionListener} listener 
     * @param {any} [context] 
     * @returns {this}
     */
    unbind(event, listener, context) {
        this.events.removeListener(event, listener, context)
        return this
    }

    /**
     * @protected
     * @param {string} event 
     * @param {any} data 
     */
    dispatch(event, data = null) {
        this.logger.trace(`dispatch event=(${event}) data=(${JSON.stringify(data)})`)
        this.events.emit(event, data, this.scene.modules, this.scene.services)
        if (this.events.listenerCount(event) === 0) {
            this.logger.warning(`event=(${event}) is not handled, data=(${JSON.stringify(data)})`)
        }
        return this
    }

}

export default Module