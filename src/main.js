let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
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

// reserve keyboard vars
let keyC, keySPACE, key1, key2, key3, key4, key5, key6, key7, key8, key9