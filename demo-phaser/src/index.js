import { Game } from 'phaser'
import ReactScene from './ReactScene'

import '../../node_modules/@bythope/phaser-plus/lib/bundle.css'

const game = new Game({
    parent: 'root',
    dom: {
        createContainer: true
    }
})

game.scene.add('test', new ReactScene())

game.scene.start('test')