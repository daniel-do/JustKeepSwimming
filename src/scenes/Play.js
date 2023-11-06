class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    preload() {
        this.load.spritesheet('goldfish', './assets/images/goldfish_spritesheet.png', { frameWidth: 105, frameHeight: 65, startFrame: 0, endFrame: 2})
        this.load.spritesheet('kelp', './assets/images/kelp_spritesheet.png', { frameWidth: 151, frameHeight: 640, startFrame: 0, endFrame: 2})
        this.load.audio('lane1', './assets/audio/piano-c4.mp3') //piano keys
        this.load.audio('lane2', './assets/audio/piano-d4.mp3')
        this.load.audio('lane3', './assets/audio/piano-e4.mp3')
        this.load.audio('lane4', './assets/audio/piano-f4.mp3')
        this.load.audio('lane5', './assets/audio/piano-g4.mp3')
        this.load.audio('lane6', './assets/audio/piano-a4.mp3')
        this.load.audio('lane7', './assets/audio/piano-b4.mp3')
        this.load.audio('lane8', './assets/audio/piano-c5.mp3')
        this.load.audio('lane9', './assets/audio/piano-d5.mp3')
        this.load.audio('bubble', './assets/audio/bubble.mp3') //spongebob squarepants
        this.load.audio('crunch', './assets/audio/crunch.mp3') //https://www.youtube.com/watch?v=VwmT4q1iq0M
        this.load.image('lane', './assets/images/lane.png')
        this.load.image('num1', './assets/images/num1.png')
        this.load.image('num2', './assets/images/num2.png')
        this.load.image('num3', './assets/images/num3.png')
        this.load.image('num4', './assets/images/num4.png')
        this.load.image('num5', './assets/images/num5.png')
        this.load.image('num6', './assets/images/num6.png')
        this.load.image('num7', './assets/images/num7.png')
        this.load.image('num8', './assets/images/num8.png')
        this.load.image('num9', './assets/images/num9.png')
        this.load.image('underwaterBubbles', './assets/images/underwaterAmbreBubbles.png')
    }

    create() {
        gameover = false
        score = 0
        kelpSpawn = 1
        kelpCopy = 1
        speed = 200

        // place tile sprite
        this.underwater = this.add.tileSprite(0, 0, 960, 640, 'underwaterBubbles').setOrigin(0, 0);

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

        // Add lane indication borders
        this.lane = this.physics.add.group();
        this.lane.enableBody = true;
        this.lane.physicsBodyType = Phaser.Physics.ARCADE;
        this.lane.create((game.config.width / 2), (game.config.height / 9) * 1, 'lane').setScale(1)
        this.lane.create((game.config.width / 2), (game.config.height / 9) * 2, 'lane').setScale(1)
        this.lane.create((game.config.width / 2), (game.config.height / 9) * 3, 'lane').setScale(1)
        this.lane.create((game.config.width / 2), (game.config.height / 9) * 4, 'lane').setScale(1)
        this.lane.create((game.config.width / 2), (game.config.height / 9) * 5, 'lane').setScale(1)
        this.lane.create((game.config.width / 2), (game.config.height / 9) * 6, 'lane').setScale(1)
        this.lane.create((game.config.width / 2), (game.config.height / 9) * 7, 'lane').setScale(1)
        this.lane.create((game.config.width / 2), (game.config.height / 9) * 8, 'lane').setScale(1)

        // Add lane numbers
        this.num = this.physics.add.group();
        this.num.enableBody = true;
        this.num.physicsBodyType = Phaser.Physics.ARCADE;
        this.num.create((game.config.width / 30), (game.config.height / 2) - ((game.config.height / numLanes) * 4), 'num1').setScale(1)
        this.num.create((game.config.width / 30), (game.config.height / 2) - ((game.config.height / numLanes) * 3), 'num2').setScale(1)
        this.num.create((game.config.width / 30), (game.config.height / 2) - ((game.config.height / numLanes) * 2), 'num3').setScale(1)
        this.num.create((game.config.width / 30), (game.config.height / 2) - ((game.config.height / numLanes) * 1), 'num4').setScale(1)
        this.num.create((game.config.width / 30), (game.config.height / 2), 'num5').setScale(1)
        this.num.create((game.config.width / 30), (game.config.height / 2) + ((game.config.height / numLanes) * 1), 'num6').setScale(1)
        this.num.create((game.config.width / 30), (game.config.height / 2) + ((game.config.height / numLanes) * 2), 'num7').setScale(1)
        this.num.create((game.config.width / 30), (game.config.height / 2) + ((game.config.height / numLanes) * 3), 'num8').setScale(1)
        this.num.create((game.config.width / 30), (game.config.height / 2) + ((game.config.height / numLanes) * 4), 'num9').setScale(1)

        // Add kelp to the game world
        this.kelp1 = this.physics.add.sprite(kelpX, (game.config.height / 2) + ((game.config.height / 9) * 1), 'kelp').setScale(1)
        this.kelp2 = this.physics.add.sprite(kelpX, (game.config.height / 2) + ((game.config.height / 9) * 1), 'kelp').setScale(1)
        this.kelp3 = this.physics.add.sprite(kelpX, (game.config.height / 2) + ((game.config.height / 9) * 1), 'kelp').setScale(1)
        this.kelp4 = this.physics.add.sprite(kelpX, (game.config.height / 2) + ((game.config.height / 9) * 1), 'kelp').setScale(1)
        this.kelp5 = this.physics.add.sprite(kelpX, (game.config.height / 2) + ((game.config.height / 9) * 1), 'kelp').setScale(1)
        this.kelp6 = this.physics.add.sprite(kelpX, (game.config.height / 2) + ((game.config.height / 9) * 1), 'kelp').setScale(1)
        this.kelp7 = this.physics.add.sprite(kelpX, (game.config.height / 2) + ((game.config.height / 9) * 1), 'kelp').setScale(1)
        this.kelp8 = this.physics.add.sprite(kelpX, (game.config.height / 2) + ((game.config.height / 9) * 1), 'kelp').setScale(1)

        // Add player
        this.goldfish = this.physics.add.sprite(game.config.width / 8, game.config.height / 2, 'goldfish').setScale(0.7)
        this.goldfish.setCollideWorldBounds(true)

        // Add score text to the game world
        this.scoreText = this.add.text((game.config.width / 30) * 27, ((game.config.height / 2) - ((game.config.height / numLanes) * 4)) - 30, score, { font: '50px Impact', fill: '#FFFF00', align: 'right' });

        this.time.addEvent({
            delay: kelpDelay, // in milliseconds
            callback: this.spawnKelp,
            callbackScope: this,
            loop: true
        });

        // Add collision detection between player and kelp
        this.physics.add.collider(this.goldfish, this.kelp1, () => {
            this.crunch.play()
            gameover = true
        });
        this.physics.add.collider(this.goldfish, this.kelp2, () => {
            this.crunch.play()
            gameover = true
        });
        this.physics.add.collider(this.goldfish, this.kelp3, () => {
            this.crunch.play()
            gameover = true
        });
        this.physics.add.collider(this.goldfish, this.kelp4, () => {
            this.crunch.play()
            gameover = true
        });
        this.physics.add.collider(this.goldfish, this.kelp5, () => {
            this.crunch.play()
            gameover = true
        });
        this.physics.add.collider(this.goldfish, this.kelp6, () => {
            this.crunch.play()
            gameover = true
        });
        this.physics.add.collider(this.goldfish, this.kelp7, () => {
            this.crunch.play()
            gameover = true
        });
        this.physics.add.collider(this.goldfish, this.kelp8, () => {
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

        // animation config
        this.anims.create({
            key: 'swimmingFish',
            frames: this.anims.generateFrameNumbers('goldfish', { 
                start: 0, 
                end: 2, 
                first: 0
            }),
            frameRate: 9
        });
        this.anims.create({
            key: 'swayingKelp',
            frames: this.anims.generateFrameNumbers('kelp', { 
                start: 0, 
                end: 2, 
                first: 0
            }),
            frameRate: 9
        });
    }

    spawnKelp() {
        // Spawn new kelp randomly
        let kelpPosition = Phaser.Math.Between(1, 9)
        if (kelpSpawn == 1) {
            // Move kelp towards the right of the screen
            this.kelp1.setVelocityX(speed * -1)
            this.kelp2.setVelocityX(speed * -1)
        } else if (kelpSpawn == 2) {
            // Move kelp towards the right of the screen
            this.kelp3.setVelocityX(speed * -1)
            this.kelp4.setVelocityX(speed * -1)
        } else if (kelpSpawn == 3) {
            // Move kelp towards the right of the screen
            this.kelp5.setVelocityX(speed * -1)
            this.kelp6.setVelocityX(speed * -1)
        } else if (kelpSpawn == 4) {    
            // Move kelp towards the right of the screen
            this.kelp7.setVelocityX(speed * -1)
            this.kelp8.setVelocityX(speed * -1)
        }
        if (kelpPosition == 1) {
            if (kelpCopy == 1) {
                if (this.kelp1.x > game.config.width) {
                    this.kelp1.y = (game.config.height / 2) + ((game.config.height / 9) * 1)
                    this.kelp2.y = (game.config.height / 2) - ((game.config.height / 9) * 9)
                }
            }
            if (kelpCopy == 2) {
                if (this.kelp3.x > game.config.width) {
                    this.kelp3.y = (game.config.height / 2) + ((game.config.height / 9) * 1)
                    this.kelp4.y = (game.config.height / 2) - ((game.config.height / 9) * 9)
                }
            }
            if (kelpCopy == 3) {
                if (this.kelp5.x > game.config.width) {
                    this.kelp5.y = (game.config.height / 2) + ((game.config.height / 9) * 1)
                    this.kelp6.y = (game.config.height / 2) - ((game.config.height / 9) * 9)
                }
            }
            if (kelpCopy == 4) {
                if (this.kelp7.x > game.config.width) {
                    this.kelp7.y = (game.config.height / 2) + ((game.config.height / 9) * 1)
                    this.kelp8.y = (game.config.height / 2) - ((game.config.height / 9) * 9)
                }
            }
        } else if (kelpPosition == 2) {
            if (kelpCopy == 1) {
                if (this.kelp1.x > game.config.width) {
                    this.kelp1.y = (game.config.height / 2) + ((game.config.height / 9) * 2)
                    this.kelp2.y = (game.config.height / 2) - ((game.config.height / 9) * 8)
                }
            }
            if (kelpCopy == 2) {
                if (this.kelp3.x > game.config.width) {
                    this.kelp3.y = (game.config.height / 2) + ((game.config.height / 9) * 2)
                    this.kelp4.y = (game.config.height / 2) - ((game.config.height / 9) * 8)
                }
            }
            if (kelpCopy == 3) {
                if (this.kelp5.x > game.config.width) {
                    this.kelp5.y = (game.config.height / 2) + ((game.config.height / 9) * 2)
                    this.kelp6.y = (game.config.height / 2) - ((game.config.height / 9) * 8)
                }
            }
            if (kelpCopy == 4) {
                if (this.kelp7.x > game.config.width) {
                    this.kelp7.y = (game.config.height / 2) + ((game.config.height / 9) * 2)
                    this.kelp8.y = (game.config.height / 2) - ((game.config.height / 9) * 8)
                }
            }
        } else if (kelpPosition == 3) {
            if (kelpCopy == 1) {
                if (this.kelp1.x > game.config.width) {
                    this.kelp1.y = (game.config.height / 2) + ((game.config.height / 9) * 3)
                    this.kelp2.y = (game.config.height / 2) - ((game.config.height / 9) * 7)
                }
            }
            if (kelpCopy == 2) {
                if (this.kelp3.x > game.config.width) {
                    this.kelp3.y = (game.config.height / 2) + ((game.config.height / 9) * 3)
                    this.kelp4.y = (game.config.height / 2) - ((game.config.height / 9) * 7)
                }
            }
            if (kelpCopy == 3) {
                if (this.kelp5.x > game.config.width) {
                    this.kelp5.y = (game.config.height / 2) + ((game.config.height / 9) * 3)
                    this.kelp6.y = (game.config.height / 2) - ((game.config.height / 9) * 7)
                }
            }
            if (kelpCopy == 4) {
                if (this.kelp7.x > game.config.width) {
                    this.kelp7.y = (game.config.height / 2) + ((game.config.height / 9) * 3)
                    this.kelp8.y = (game.config.height / 2) - ((game.config.height / 9) * 7)
                }
            }
        } else if (kelpPosition == 4) {
            if (kelpCopy == 1) {
                if (this.kelp1.x > game.config.width) {
                    this.kelp1.y = (game.config.height / 2) + ((game.config.height / 9) * 4)
                    this.kelp2.y = (game.config.height / 2) - ((game.config.height / 9) * 6)
                }
            }
            if (kelpCopy == 2) {
                if (this.kelp3.x > game.config.width) {
                    this.kelp3.y = (game.config.height / 2) + ((game.config.height / 9) * 4)
                    this.kelp4.y = (game.config.height / 2) - ((game.config.height / 9) * 6)
                }
            }
            if (kelpCopy == 3) {
                if (this.kelp5.x > game.config.width) {
                    this.kelp5.y = (game.config.height / 2) + ((game.config.height / 9) * 4)
                    this.kelp6.y = (game.config.height / 2) - ((game.config.height / 9) * 6)
                }
            }
            if (kelpCopy == 4) {
                if (this.kelp7.x > game.config.width) {
                    this.kelp7.y = (game.config.height / 2) + ((game.config.height / 9) * 4)
                    this.kelp8.y = (game.config.height / 2) - ((game.config.height / 9) * 6)
                }
            }
        } else if (kelpPosition == 5) {
            if (kelpCopy == 1) {
                if (this.kelp1.x > game.config.width) {
                    this.kelp1.y = (game.config.height / 2) + ((game.config.height / 9) * 5)
                    this.kelp2.y = (game.config.height / 2) - ((game.config.height / 9) * 5)
                }
            }
            if (kelpCopy == 2) {
                if (this.kelp3.x > game.config.width) {
                    this.kelp3.y = (game.config.height / 2) + ((game.config.height / 9) * 5)
                    this.kelp4.y = (game.config.height / 2) - ((game.config.height / 9) * 5)
                }
            }
            if (kelpCopy == 3) {
                if (this.kelp5.x > game.config.width) {
                    this.kelp5.y = (game.config.height / 2) + ((game.config.height / 9) * 5)
                    this.kelp6.y = (game.config.height / 2) - ((game.config.height / 9) * 5)
                }
            }
            if (kelpCopy == 4) {
                if (this.kelp7.x > game.config.width) {
                    this.kelp7.y = (game.config.height / 2) + ((game.config.height / 9) * 5)
                    this.kelp8.y = (game.config.height / 2) - ((game.config.height / 9) * 5)
                }
            }
        } else if (kelpPosition == 6) {
            if (kelpCopy == 1) {
                if (this.kelp1.x > game.config.width) {
                    this.kelp1.y = (game.config.height / 2) + ((game.config.height / 9) * 6)
                    this.kelp2.y = (game.config.height / 2) - ((game.config.height / 9) * 4)
                }
            }
            if (kelpCopy == 2) {
                if (this.kelp3.x > game.config.width) {
                    this.kelp3.y = (game.config.height / 2) + ((game.config.height / 9) * 6)
                    this.kelp4.y = (game.config.height / 2) - ((game.config.height / 9) * 4)
                }
            }
            if (kelpCopy == 3) {
                if (this.kelp5.x > game.config.width) {
                    this.kelp5.y = (game.config.height / 2) + ((game.config.height / 9) * 6)
                    this.kelp6.y = (game.config.height / 2) - ((game.config.height / 9) * 4)
                }
            }
            if (kelpCopy == 4) {
                if (this.kelp7.x > game.config.width) {
                    this.kelp7.y = (game.config.height / 2) + ((game.config.height / 9) * 6)
                    this.kelp8.y = (game.config.height / 2) - ((game.config.height / 9) * 4)
                }
            }
        } else if (kelpPosition == 7) {
            if (kelpCopy == 1) {
                if (this.kelp1.x > game.config.width) {
                    this.kelp1.y = (game.config.height / 2) + ((game.config.height / 9) * 7)
                    this.kelp2.y = (game.config.height / 2) - ((game.config.height / 9) * 3)
                }
            }
            if (kelpCopy == 2) {
                if (this.kelp3.x > game.config.width) {
                    this.kelp3.y = (game.config.height / 2) + ((game.config.height / 9) * 7)
                    this.kelp4.y = (game.config.height / 2) - ((game.config.height / 9) * 3)
                }
            }
            if (kelpCopy == 3) {
                if (this.kelp5.x > game.config.width) {
                    this.kelp5.y = (game.config.height / 2) + ((game.config.height / 9) * 7)
                    this.kelp6.y = (game.config.height / 2) - ((game.config.height / 9) * 3)
                }
            }
            if (kelpCopy == 4) {
                if (this.kelp7.x > game.config.width) {
                    this.kelp7.y = (game.config.height / 2) + ((game.config.height / 9) * 7)
                    this.kelp8.y = (game.config.height / 2) - ((game.config.height / 9) * 3)
                }
            }
        } else if (kelpPosition == 8) {
            if (kelpCopy == 1) {
                if (this.kelp1.x > game.config.width) {
                    this.kelp1.y = (game.config.height / 2) + ((game.config.height / 9) * 8)
                    this.kelp2.y = (game.config.height / 2) - ((game.config.height / 9) * 2)
                }
            }
            if (kelpCopy == 2) {
                if (this.kelp3.x > game.config.width) {
                    this.kelp3.y = (game.config.height / 2) + ((game.config.height / 9) * 8)
                    this.kelp4.y = (game.config.height / 2) - ((game.config.height / 9) * 2)
                }
            }
            if (kelpCopy == 3) {
                if (this.kelp5.x > game.config.width) {
                    this.kelp5.y = (game.config.height / 2) + ((game.config.height / 9) * 8)
                    this.kelp6.y = (game.config.height / 2) - ((game.config.height / 9) * 2)
                }
            }
            if (kelpCopy == 4) {
                if (this.kelp7.x > game.config.width) {
                    this.kelp7.y = (game.config.height / 2) + ((game.config.height / 9) * 8)
                    this.kelp8.y = (game.config.height / 2) - ((game.config.height / 9) * 2)
                }
            }
        } else if (kelpPosition == 9) {
            if (kelpCopy == 1) {
                if (this.kelp1.x > game.config.width) {
                    this.kelp1.y = (game.config.height / 2) + ((game.config.height / 9) * 9)
                    this.kelp2.y = (game.config.height / 2) - ((game.config.height / 9) * 1)
                }
            }
            if (kelpCopy == 2) {
                if (this.kelp3.x > game.config.width) {
                    this.kelp3.y = (game.config.height / 2) + ((game.config.height / 9) * 9)
                    this.kelp4.y = (game.config.height / 2) - ((game.config.height / 9) * 1)
                }
            }
            if (kelpCopy == 3) {
                if (this.kelp5.x > game.config.width) {
                    this.kelp5.y = (game.config.height / 2) + ((game.config.height / 9) * 9)
                    this.kelp6.y = (game.config.height / 2) - ((game.config.height / 9) * 1)
                }
            }
            if (kelpCopy == 4) {
                if (this.kelp7.x > game.config.width) {
                    this.kelp7.y = (game.config.height / 2) + ((game.config.height / 9) * 9)
                    this.kelp8.y = (game.config.height / 2) - ((game.config.height / 9) * 1)
                }
            }
        }
        kelpSpawn++
        kelpCopy++
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

        this.underwater.tilePositionX += 4;

        // Lane movement
        if (Phaser.Input.Keyboard.JustDown(key1)) { // lane 1
            this.lane1.play(musicConfig)
            this.goldfish.y = (game.config.height / 2) - ((game.config.height / numLanes) * 4)
        } else if (Phaser.Input.Keyboard.JustDown(key2)) { // lane 2
            this.lane2.play(musicConfig)
            this.goldfish.y = (game.config.height / 2) - ((game.config.height / numLanes) * 3)
        } else if (Phaser.Input.Keyboard.JustDown(key3)) { // lane 3
            this.lane3.play(musicConfig)
            this.goldfish.y = (game.config.height / 2) - ((game.config.height / numLanes) * 2)
        } else if (Phaser.Input.Keyboard.JustDown(key4)) { // lane 4
            this.lane4.play(musicConfig)
            this.goldfish.y = (game.config.height / 2) - ((game.config.height / numLanes) * 1)
        } else if (Phaser.Input.Keyboard.JustDown(key5)) { // lane 5
            this.lane5.play(musicConfig)
            this.goldfish.y = (game.config.height / 2)
        } else if (Phaser.Input.Keyboard.JustDown(key6)) { // lane 6
            this.lane6.play(musicConfig)
            this.goldfish.y = (game.config.height / 2) + ((game.config.height / numLanes) * 1)
        } else if (Phaser.Input.Keyboard.JustDown(key7)) { // lane 7
            this.lane7.play(musicConfig)
            this.goldfish.y = (game.config.height / 2) + ((game.config.height / numLanes) * 2)
        } else if (Phaser.Input.Keyboard.JustDown(key8)) { // lane 8
            this.lane8.play(musicConfig)
            this.goldfish.y = (game.config.height / 2) + ((game.config.height / numLanes) * 3)
        } else if (Phaser.Input.Keyboard.JustDown(key9)) { // lane 9
            this.lane9.play(musicConfig)
            this.goldfish.y = (game.config.height / 2) + ((game.config.height / numLanes) * 4)
        }

        let kelpPosition = Phaser.Math.Between(1, 9)
        if (kelpPosition == 1) {
            if (this.kelp1.x > game.config.width + 100) {
                this.kelp1.y = (game.config.height / 2) + ((game.config.height / 9) * 1)
                this.kelp2.y = (game.config.height / 2) - ((game.config.height / 9) * 9)
            }
            if (this.kelp3.x > game.config.width + 100) {
                this.kelp3.y = (game.config.height / 2) + ((game.config.height / 9) * 1)
                this.kelp4.y = (game.config.height / 2) - ((game.config.height / 9) * 9)
            }
            if (this.kelp5.x > game.config.width + 100) {
                this.kelp5.y = (game.config.height / 2) + ((game.config.height / 9) * 1)
                this.kelp6.y = (game.config.height / 2) - ((game.config.height / 9) * 9)
            }
            if (this.kelp7.x > game.config.width + 100) {
                this.kelp7.y = (game.config.height / 2) + ((game.config.height / 9) * 1)
                this.kelp8.y = (game.config.height / 2) - ((game.config.height / 9) * 9)
            }
        } else if (kelpPosition == 2) {
            if (this.kelp1.x > game.config.width + 100) {
                this.kelp1.y = (game.config.height / 2) + ((game.config.height / 9) * 2)
                this.kelp2.y = (game.config.height / 2) - ((game.config.height / 9) * 8)
            }
            if (this.kelp3.x > game.config.width + 100) {
                this.kelp3.y = (game.config.height / 2) + ((game.config.height / 9) * 2)
                this.kelp4.y = (game.config.height / 2) - ((game.config.height / 9) * 8)
            }
            if (this.kelp5.x > game.config.width + 100) {
                this.kelp5.y = (game.config.height / 2) + ((game.config.height / 9) * 2)
                this.kelp6.y = (game.config.height / 2) - ((game.config.height / 9) * 8)
            }
            if (this.kelp7.x > game.config.width + 100) {
                this.kelp7.y = (game.config.height / 2) + ((game.config.height / 9) * 2)
                this.kelp8.y = (game.config.height / 2) - ((game.config.height / 9) * 8)
            }
        } else if (kelpPosition == 3) {
            if (this.kelp1.x > game.config.width + 100) {
                this.kelp1.y = (game.config.height / 2) + ((game.config.height / 9) * 3)
                this.kelp2.y = (game.config.height / 2) - ((game.config.height / 9) * 7)
            }
            if (this.kelp3.x > game.config.width + 100) {
                this.kelp3.y = (game.config.height / 2) + ((game.config.height / 9) * 3)
                this.kelp4.y = (game.config.height / 2) - ((game.config.height / 9) * 7)
            }
            if (this.kelp5.x > game.config.width + 100) {
                this.kelp5.y = (game.config.height / 2) + ((game.config.height / 9) * 3)
                this.kelp6.y = (game.config.height / 2) - ((game.config.height / 9) * 7)
            }
            if (this.kelp7.x > game.config.width + 100) {
                this.kelp7.y = (game.config.height / 2) + ((game.config.height / 9) * 3)
                this.kelp8.y = (game.config.height / 2) - ((game.config.height / 9) * 7)
            }
        } else if (kelpPosition == 4) {
            if (this.kelp1.x > game.config.width + 100) {
                this.kelp1.y = (game.config.height / 2) + ((game.config.height / 9) * 4)
                this.kelp2.y = (game.config.height / 2) - ((game.config.height / 9) * 6)
            }
            if (this.kelp3.x > game.config.width + 100) {
                this.kelp3.y = (game.config.height / 2) + ((game.config.height / 9) * 4)
                this.kelp4.y = (game.config.height / 2) - ((game.config.height / 9) * 6)
            }
            if (this.kelp5.x > game.config.width + 100) {
                this.kelp5.y = (game.config.height / 2) + ((game.config.height / 9) * 4)
                this.kelp6.y = (game.config.height / 2) - ((game.config.height / 9) * 6)
            }
            if (this.kelp7.x > game.config.width + 100) {
                this.kelp7.y = (game.config.height / 2) + ((game.config.height / 9) * 4)
                this.kelp8.y = (game.config.height / 2) - ((game.config.height / 9) * 6)
            }
        } else if (kelpPosition == 5) {
            if (this.kelp1.x > game.config.width + 100) {
                this.kelp1.y = (game.config.height / 2) + ((game.config.height / 9) * 5)
                this.kelp2.y = (game.config.height / 2) - ((game.config.height / 9) * 5)
            }
            if (this.kelp3.x > game.config.width + 100) {
                this.kelp3.y = (game.config.height / 2) + ((game.config.height / 9) * 5)
                this.kelp4.y = (game.config.height / 2) - ((game.config.height / 9) * 5)
            }
            if (this.kelp5.x > game.config.width + 100) {
                this.kelp5.y = (game.config.height / 2) + ((game.config.height / 9) * 5)
                this.kelp6.y = (game.config.height / 2) - ((game.config.height / 9) * 5)
            }
            if (this.kelp7.x > game.config.width + 100) {
                this.kelp7.y = (game.config.height / 2) + ((game.config.height / 9) * 5)
                this.kelp8.y = (game.config.height / 2) - ((game.config.height / 9) * 5)
            }
        } else if (kelpPosition == 6) {
            if (this.kelp1.x > game.config.width + 100) {
                this.kelp1.y = (game.config.height / 2) + ((game.config.height / 9) * 6)
                this.kelp2.y = (game.config.height / 2) - ((game.config.height / 9) * 4)
            }
            if (this.kelp3.x > game.config.width + 100) {
                this.kelp3.y = (game.config.height / 2) + ((game.config.height / 9) * 6)
                this.kelp4.y = (game.config.height / 2) - ((game.config.height / 9) * 4)
            }
            if (this.kelp5.x > game.config.width + 100) {
                this.kelp5.y = (game.config.height / 2) + ((game.config.height / 9) * 6)
                this.kelp6.y = (game.config.height / 2) - ((game.config.height / 9) * 4)
            }
            if (this.kelp7.x > game.config.width + 100) {
                this.kelp7.y = (game.config.height / 2) + ((game.config.height / 9) * 6)
                this.kelp8.y = (game.config.height / 2) - ((game.config.height / 9) * 4)
            }
        } else if (kelpPosition == 7) {
            if (this.kelp1.x > game.config.width + 100) {
                this.kelp1.y = (game.config.height / 2) + ((game.config.height / 9) * 7)
                this.kelp2.y = (game.config.height / 2) - ((game.config.height / 9) * 3)
            }
            if (this.kelp3.x > game.config.width + 100) {
                this.kelp3.y = (game.config.height / 2) + ((game.config.height / 9) * 7)
                this.kelp4.y = (game.config.height / 2) - ((game.config.height / 9) * 3)
            }
            if (this.kelp5.x > game.config.width + 100) {
                this.kelp5.y = (game.config.height / 2) + ((game.config.height / 9) * 7)
                this.kelp6.y = (game.config.height / 2) - ((game.config.height / 9) * 3)
            }
            if (this.kelp7.x > game.config.width + 100) {
                this.kelp7.y = (game.config.height / 2) + ((game.config.height / 9) * 7)
                this.kelp8.y = (game.config.height / 2) - ((game.config.height / 9) * 3)
            }
        } else if (kelpPosition == 8) {
            if (this.kelp1.x > game.config.width + 100) {
                this.kelp1.y = (game.config.height / 2) + ((game.config.height / 9) * 8)
                this.kelp2.y = (game.config.height / 2) - ((game.config.height / 9) * 2)
            }
            if (this.kelp3.x > game.config.width + 100) {
                this.kelp3.y = (game.config.height / 2) + ((game.config.height / 9) * 8)
                this.kelp4.y = (game.config.height / 2) - ((game.config.height / 9) * 2)
            }
            if (this.kelp5.x > game.config.width + 100) {
                this.kelp5.y = (game.config.height / 2) + ((game.config.height / 9) * 8)
                this.kelp6.y = (game.config.height / 2) - ((game.config.height / 9) * 2)
            }
            if (this.kelp7.x > game.config.width + 100) {
                this.kelp7.y = (game.config.height / 2) + ((game.config.height / 9) * 8)
                this.kelp8.y = (game.config.height / 2) - ((game.config.height / 9) * 2)
            }
        } else if (kelpPosition == 9) {
            if (this.kelp1.x > game.config.width + 100) {
                this.kelp1.y = (game.config.height / 2) + ((game.config.height / 9) * 9)
                this.kelp2.y = (game.config.height / 2) - ((game.config.height / 9) * 1)
            }
            if (this.kelp3.x > game.config.width + 100) {
                this.kelp3.y = (game.config.height / 2) + ((game.config.height / 9) * 9)
                this.kelp4.y = (game.config.height / 2) - ((game.config.height / 9) * 1)
            }
            if (this.kelp5.x > game.config.width + 100) {
                this.kelp5.y = (game.config.height / 2) + ((game.config.height / 9) * 9)
                this.kelp6.y = (game.config.height / 2) - ((game.config.height / 9) * 1)
            }
            if (this.kelp7.x > game.config.width + 100) {
                this.kelp7.y = (game.config.height / 2) + ((game.config.height / 9) * 9)
                this.kelp8.y = (game.config.height / 2) - ((game.config.height / 9) * 1)
            }
        }

        let padding = 500

        this.physics.world.wrap(this.kelp1, padding)
        this.physics.world.wrap(this.kelp2, padding)
        this.physics.world.wrap(this.kelp3, padding)
        this.physics.world.wrap(this.kelp4, padding)
        this.physics.world.wrap(this.kelp5, padding)
        this.physics.world.wrap(this.kelp6, padding)
        this.physics.world.wrap(this.kelp7, padding)
        this.physics.world.wrap(this.kelp8, padding)

        this.goldfish.anims.play('swimmingFish', true)
        this.kelp1.anims.play('swayingKelp', true)
        this.kelp2.anims.play('swayingKelp', true)
        this.kelp3.anims.play('swayingKelp', true)
        this.kelp4.anims.play('swayingKelp', true)
        this.kelp5.anims.play('swayingKelp', true)
        this.kelp6.anims.play('swayingKelp', true)
        this.kelp7.anims.play('swayingKelp', true)
        this.kelp8.anims.play('swayingKelp', true)

        if (kelpSpawn > 4) {
            this.kelp1.setVelocityX(speed * -1)
            this.kelp2.setVelocityX(speed * -1)
            this.kelp3.setVelocityX(speed * -1)
            this.kelp4.setVelocityX(speed * -1)
            this.kelp5.setVelocityX(speed * -1)
            this.kelp6.setVelocityX(speed * -1)
            this.kelp7.setVelocityX(speed * -1)
            this.kelp8.setVelocityX(speed * -1)
        }

        // Increase speed of kelp with each score increase (DOES NOT WORK)
        if (((this.kelp1.x <= (game.config.width / 8) + 2) && (this.kelp1.x >= (game.config.width / 8) - 2)) || ((this.kelp3.x <= (game.config.width / 8) + 2) && (this.kelp3.x >= (game.config.width / 8) - 2)) || ((this.kelp5.x <= (game.config.width / 8) + 2) && (this.kelp5.x >= (game.config.width / 8) - 2)) || ((this.kelp7.x <= (game.config.width / 8) + 2) && (this.kelp7.x >= (game.config.width / 8) - 2))) {
            score += 1
            speed += 10
            //speedMultiplier += 1
            //kelpDelay -= 200 * speedMultiplier
            this.bubble.play()
            //console.log(speed)
        }

        this.scoreText.setText(score);

        // Game over logic
        if (gameover) {
            this.scene.start("gameoverScene");
        }
    }
}