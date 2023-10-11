class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    preload() {
        this.load.image('player', './assets/images/triangle.png')
        this.load.image('kelp', './assets/images/kelp.png')
        this.load.audio('lane1', './assets/audio/piano-c4.mp3')
        this.load.audio('lane2', './assets/audio/piano-d4.mp3')
        this.load.audio('lane3', './assets/audio/piano-e4.mp3')
        this.load.audio('lane4', './assets/audio/piano-f4.mp3')
        this.load.audio('lane5', './assets/audio/piano-g4.mp3')
        this.load.audio('lane6', './assets/audio/piano-a4.mp3')
        this.load.audio('lane7', './assets/audio/piano-b4.mp3')
        this.load.audio('lane8', './assets/audio/piano-c5.mp3')
        this.load.audio('lane9', './assets/audio/piano-d5.mp3')
        this.load.audio('bubble', './assets/audio/bubble.mp3')
        this.load.audio('crunch', './assets/audio/crunch.mp3')
    }

    create() {
        gameover = false
        score = 0

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
        this.bubble = this.sound.add('bubble')
        this.crunch = this.sound.add('crunch')

        // Add kelp to the game world
        this.kelp = this.physics.add.group();
        this.kelp.enableBody = true;
        this.kelp.physicsBodyType = Phaser.Physics.ARCADE;

        // Add player
        this.player = this.physics.add.sprite(game.config.width / 8, game.config.height / 2, 'player').setScale(0.1)
        this.player.setCollideWorldBounds(true)
        this.player.angle = 90

        this.time.addEvent({
            delay: kelpDelay, // in milliseconds
            callback: this.spawnKelp,
            callbackScope: this,
            loop: true
        });

        // Add collision detection between player and kelp
        this.physics.add.collider(this.player, this.kelp, () => {
            this.crunch.play()
            gameover = true
          });

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

    spawnKelp() {
        // Spawn new kelp randomly
        let kelpPosition = Phaser.Math.Between(1, 9)
        let kelpX = 1000
        if (kelpPosition == 1) {
            this.kelp.create(kelpX, (game.config.height / 2) + ((game.config.height / 9) * 1), 'kelp')
            this.kelp.create(kelpX, (game.config.height / 2) - ((game.config.height / 9) * 9), 'kelp')
        } else if (kelpPosition == 2) {
            this.kelp.create(kelpX, (game.config.height / 2) + ((game.config.height / 9) * 2), 'kelp')
            this.kelp.create(kelpX, (game.config.height / 2) - ((game.config.height / 9) * 8), 'kelp')
        } else if (kelpPosition == 3) {
            this.kelp.create(kelpX, (game.config.height / 2) + ((game.config.height / 9) * 3), 'kelp')
            this.kelp.create(kelpX, (game.config.height / 2) - ((game.config.height / 9) * 7), 'kelp')
        } else if (kelpPosition == 4) {
            this.kelp.create(kelpX, (game.config.height / 2) + ((game.config.height / 9) * 4), 'kelp')
            this.kelp.create(kelpX, (game.config.height / 2) - ((game.config.height / 9) * 6), 'kelp')
        } else if (kelpPosition == 5) {
            this.kelp.create(kelpX, (game.config.height / 2) + ((game.config.height / 9) * 5), 'kelp')
            this.kelp.create(kelpX, (game.config.height / 2) - ((game.config.height / 9) * 5), 'kelp')
        } else if (kelpPosition == 6) {
            this.kelp.create(kelpX, (game.config.height / 2) + ((game.config.height / 9) * 6), 'kelp')
            this.kelp.create(kelpX, (game.config.height / 2) - ((game.config.height / 9) * 4), 'kelp')
        } else if (kelpPosition == 7) {
            this.kelp.create(kelpX, (game.config.height / 2) + ((game.config.height / 9) * 7), 'kelp')
            this.kelp.create(kelpX, (game.config.height / 2) - ((game.config.height / 9) * 3), 'kelp')
        } else if (kelpPosition == 8) {
            this.kelp.create(kelpX, (game.config.height / 2) + ((game.config.height / 9) * 8), 'kelp')
            this.kelp.create(kelpX, (game.config.height / 2) - ((game.config.height / 9) * 2), 'kelp')
        } else if (kelpPosition == 9) {
            this.kelp.create(kelpX, (game.config.height / 2) + ((game.config.height / 9) * 9), 'kelp')
            this.kelp.create(kelpX, (game.config.height / 2) - ((game.config.height / 9) * 1), 'kelp')
        }
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
        if (Phaser.Input.Keyboard.JustDown(key1)) { // lane 1
            this.lane1.play(musicConfig)
            this.player.y = (game.config.height / 2) - ((game.config.height / numLanes) * 4)
        } else if (Phaser.Input.Keyboard.JustDown(key2)) { // lane 2
            this.lane2.play(musicConfig)
            this.player.y = (game.config.height / 2) - ((game.config.height / numLanes) * 3)
        } else if (Phaser.Input.Keyboard.JustDown(key3)) { // lane 3
            this.lane3.play(musicConfig)
            this.player.y = (game.config.height / 2) - ((game.config.height / numLanes) * 2)
        } else if (Phaser.Input.Keyboard.JustDown(key4)) { // lane 4
            this.lane4.play(musicConfig)
            this.player.y = (game.config.height / 2) - ((game.config.height / numLanes) * 1)
        } else if (Phaser.Input.Keyboard.JustDown(key5)) { // lane 5
            this.lane5.play(musicConfig)
            this.player.y = (game.config.height / 2)
        } else if (Phaser.Input.Keyboard.JustDown(key6)) { // lane 6
            this.lane6.play(musicConfig)
            this.player.y = (game.config.height / 2) + ((game.config.height / numLanes) * 1)
        } else if (Phaser.Input.Keyboard.JustDown(key7)) { // lane 7
            this.lane7.play(musicConfig)
            this.player.y = (game.config.height / 2) + ((game.config.height / numLanes) * 2)
        } else if (Phaser.Input.Keyboard.JustDown(key8)) { // lane 8
            this.lane8.play(musicConfig)
            this.player.y = (game.config.height / 2) + ((game.config.height / numLanes) * 3)
        } else if (Phaser.Input.Keyboard.JustDown(key9)) { // lane 9
            this.lane9.play(musicConfig)
            this.player.y = (game.config.height / 2) + ((game.config.height / numLanes) * 4)
        }

        // Move kelp towards the right of the screen
        this.kelp.setVelocityX(speed * -1)

        // Increase speed of kelp with each score increase (DOES NOT WORK)
        if (this.kelp.x == (game.config.width / 8)) {
            score += 0.5
            speed -= 50
            this.bubble.play()
            //console.log(speed)
        }

        // Game over logic
        // Game over logic
        if (gameover) {
            this.scene.start("gameoverScene");
        }
    }
}