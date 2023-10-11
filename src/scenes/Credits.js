class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene')
    }

    create() {
        let menuKeyConfig = 
        {
            fontFamily: 'Courier',
            fontSize: '80px',
            backgroundColor: '#CC000000',
            color: '#FFA500',
            align: 'center',
            padding:
            {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // show menu title text
        this.add.text(game.config.width/2, (game.config.height / 4) - (game.config.height / 8), 'Credits', menuKeyConfig).setOrigin(0.5)

        // show instructions text
        menuKeyConfig.fontSize = '15px'
        menuKeyConfig.color = '#FFFFFF'
        this.add.text(game.config.width/2, ((game.config.height / 4) * 2) - (game.config.height / 8), 'Created by Daniel Do', menuKeyConfig).setOrigin(0.5)

        menuKeyConfig.align = 'center'
        menuKeyConfig.color = '#FFD700'
        this.add.text(game.config.width/2, ((game.config.height / 4) * 3) - (game.config.height / 8), 'Press SPACE to play again', menuKeyConfig).setOrigin(0.5)

        menuKeyConfig.align = 'center'
        menuKeyConfig.color = '#FFFFFF'
        this.add.text(game.config.width/2, ((game.config.height / 4) * 4) - (game.config.height / 8), 'Press B to go back', menuKeyConfig).setOrigin(0.5)

        // define keys
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyB))
        {
            this.scene.start('gameoverScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keySPACE))
        {
            this.scene.start('playScene')
        }
    }
}