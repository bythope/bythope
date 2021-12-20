import { Game } from 'phaser'
import { Logger } from '@bythope/utils'

class Service {

    /**
     * @protected
     * @type {Game}
     */
    game = null

    /**
     * @protected
     * @type {Logger}
     */
    logger = null

    /**
     * 
     * @param {Game} game 
     */
    constructor(game, key) {
        this.game = game
        this.logger = Logger.getLogger(key)
        this.logger.info('Initialized!')
    }

    /** @protected */
    onCreate() {}

}

export default Service