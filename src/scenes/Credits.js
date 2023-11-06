class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene')
    }

    create() {
        // place tile sprite
        this.underwater = this.add.tileSprite(0, 0, 960, 640, 'underwater').setOrigin(0, 0);

        let menuKeyConfig = 
        {
            fontFamily: 'Courier',
            fontSize: '80px',
            backgroundColor: '#CC000000',
            color: '#FF8C00',
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
        menuKeyConfig.align = 'left'
        menuKeyConfig.fontSize = '30px'
        menuKeyConfig.color = '#FFFFFF'
        this.add.text(game.config.width/2, ((game.config.height / 4) * 1.25 + 20) - (game.config.height / 8), 'Created by Daniel Do', menuKeyConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, ((game.config.height / 4) * 1.5 + 20) - (game.config.height / 8), 'Development, Art, Design: Daniel Do', menuKeyConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, ((game.config.height / 4) * 1.75 + 20) - (game.config.height / 8), 'Music: "Finding Dory (2016)"', menuKeyConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, ((game.config.height / 4) * 2 + 20) - (game.config.height / 8), 'Piano SFX: Piano keys a4-d5', menuKeyConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, ((game.config.height / 4) * 2.25 + 20) - (game.config.height / 8), 'Bubble SFX: "SpongeBob SquarePants (1999)"', menuKeyConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, ((game.config.height / 4) * 2.5 + 20) - (game.config.height / 8), 'Crunch SFX: Imposter on YouTube', menuKeyConfig).setOrigin(0.5)

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