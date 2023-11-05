/*
Daniel Do
"Just Keep Swimming"
~37 hours

Creative tilt justification:
9 random ways for kelp to spawn
Learned Arcade Physics: gravity, velocity changes, sprite creations
Learned how to use Aesprite to make the art for the golfish, kelp, and the underwater tilemap
Through Aesprite, learned how to properly animate sprites
Unintentional paralax between the main kelp sprites and the scrolling underwater background
Made use of only 8 kelp sprites with the use of the wrap() function to mimic endless amount of kelp obstacles
*/

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
let speedMultiplier = 1
let kelpX = 1200
let kelpDelay = 2400
let kelpSpawn = 1
    let kelpCopy = 1

// reserve keyboard vars
let keyB, keyC, keySPACE, key1, key2, key3, key4, key5, key6, key7, key8, key9