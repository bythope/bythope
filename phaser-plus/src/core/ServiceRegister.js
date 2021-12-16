import { Game } from 'phaser'
import Service from './Service'

class ServiceRegister {

    /**
     * @private
     * @type {Map.<string,Service>}
     */
    services = null

    /**
     * @private
     * @type {Game}
     */
    game = null

    /**
     * 
     * @param {Game} game 
     */
    constructor(game) {
        this.game = game
        this.services = new Map()
    }

    resolve(serviceClass) {
        let key = null
        try {
            key = serviceClass.prototype.constructor.name || null
        } catch (error) {
            throw new Error('serviceClass must be an ES6 class')
        }
        if (!this.services.has(key)) {
            /** @type {Service} */
            const service = new serviceClass(this.game, key)
            service.onCreate()
            this.services.set(key, service)
            return service
        }
        return this.services.get(key)
    }

    clear() {
        this.services.clear()
    }

}

export default ServiceRegister