class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    preload() {
        this.load.spritesheet('player', './assets/images/triange.jpg')
        this.load.audio('lane1', './assets/audio/piano-c4.mp3')
        this.load.audio('lane2', './assets/audio/piano-d4.mp3')
        this.load.audio('lane3', './assets/audio/piano-e4.mp3')
        this.load.audio('lane4', './assets/audio/piano-f4.mp3')
        this.load.audio('lane5', './assets/audio/piano-g4.mp3')
        this.load.audio('lane6', './assets/audio/piano-a4.mp3')
        this.load.audio('lane7', './assets/audio/piano-b4.mp3')
        this.load.audio('lane8', './assets/audio/piano-c5.mp3')
        this.load.audio('lane9', './assets/audio/piano-d5.mp3')
    }

    create() {
        // Import sounds
        this.lane1 = this.sound.add('lane1')
        this.lane2 = this.sound.add('lane2')
        this.lane3 = this.sound.add('lane3')
        this.lane4 = this.sound.add('lane4')
        this.lane5 = this.sound.add('lane5')
        this.lane6 = this.sound.add('lane6')
        this.lane7 = this.sound.add('lane7')
        this.lane8 = this.sound.add('lane8')
        this.lane9 = this.sound.add('lane9')

        // Add player
        this.player = new Player(this, game.config.width / 10, game.config.height / 2, 'player')

        // define keys
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)
        key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE)
        key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR)
        key5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE)
        key6 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX)
        key7 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN)
        key8 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT)
        key9 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE)
    }

    update() {
        var musicConfig = {
            mute: false,
            volume: 0.25,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }

        // Lane movement
        if (Phaser.Input.Keyboard.JustDown(key1)) {
            this.lane1.play(musicConfig)
            this.player.y = (game.config.height / 2) - ((game.config.height / 9) * 4)
        } else if (Phaser.Input.Keyboard.JustDown(key2)) {
            this.lane2.play(musicConfig)
            this.player.y = (game.config.height / 2) - ((game.config.height / 9) * 3)
        } else if (Phaser.Input.Keyboard.JustDown(key3)) {
            this.lane3.play(musicConfig)
            this.player.y = (game.config.height / 2) - ((game.config.height / 9) * 2)
        } else if (Phaser.Input.Keyboard.JustDown(key4)) {
            this.lane4.play(musicConfig)
            this.player.y = (game.config.height / 2) - ((game.config.height / 9) * 1)
        } else if (Phaser.Input.Keyboard.JustDown(key5)) {
            this.lane5.play(musicConfig)
            this.player.y = (game.config.height / 2)
        } else if (Phaser.Input.Keyboard.JustDown(key6)) {
            this.lane6.play(musicConfig)
            this.player.y = (game.config.height / 2) + ((game.config.height / 9) * 1)
        } else if (Phaser.Input.Keyboard.JustDown(key7)) {
            this.lane7.play(musicConfig)
            this.player.y = (game.config.height / 2) + ((game.config.height / 9) * 2)
        } else if (Phaser.Input.Keyboard.JustDown(key8)) {
            this.lane8.play(musicConfig)
            this.player.y = (game.config.height / 2) + ((game.config.height / 9) * 3)
        } else if (Phaser.Input.Keyboard.JustDown(key9)) {
            this.lane9.play(musicConfig)
            this.player.y = (game.config.height / 2) + ((game.config.height / 9) * 4)
        }
    }
}