class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        this.load.audio('underwater', './assets/audio/Underwater.mp3') //finding dory
    }

    create() {
        // background music
        this.underwater = this.sound.add("underwater")
        this.underwater.loop = true
        this.underwater.play()

        let menuKeyConfig = 
        {
            fontFamily: 'Courier',
            fontSize: '80px',
            backgroundColor: '#CC000000',
            color: '#89CFF0',
            align: 'center',
            padding:
            {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // show menu title text
        this.add.text(game.config.width/2, 40, 'Just Keep Swimming', menuKeyConfig).setOrigin(0.5)

        // show instructions text
        menuKeyConfig.fontSize = '15px'
        menuKeyConfig.color = '#FFFFFF'
        this.add.text(game.config.width/2, 100, 'Swim through the kelp!', menuKeyConfig).setOrigin(0.5)

        // show menu key text
        menuKeyConfig.align = 'left'
        menuKeyConfig.color = '#A9A9A9'
        this.add.text(game.config.width/2, game.config.height/2 + 40, 'Controls\n\n1 - 9 - Change lanes\nC     - Credits', menuKeyConfig).setOrigin(0.5)

        menuKeyConfig.align = 'center'
        menuKeyConfig.color = '#FFD700'
        this.add.text(game.config.height/2, game.config.height/2 + 130, 'Press SPACE to start', menuKeyConfig).setOrigin(0.5)

        // define keys
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyC))
        {
            this.scene.start('creditsScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keySPACE))
        {
            this.scene.start('playScene')
        }
    }
}