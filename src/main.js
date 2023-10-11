let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Menu, Credits, Play, GameOver ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
}

let game = new Phaser.Game(config)

let score = 0
let gameover = false
let numLanes = 9
let speed = 200
let kelpDelay = 2000

// reserve keyboard vars
let keyB, keyC, keySPACE, key1, key2, key3, key4, key5, key6, key7, key8, key9