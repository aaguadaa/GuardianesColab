// Configuración del juego
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    lives: 3,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
};

let game = new Phaser.Game(config);

// Declara la variable platforms fuera de la función create
let platforms;

function preload() {
    // Cargar imágenes y sprites necesarios
    this.load.image('sky', 'assets/sprites/sky.png');
    this.load.image('cloudMini', 'assets/sprites/cloudMini.png');
    this.load.image('cloudMedium', 'assets/sprites/cloudMedium.png');
    this.load.image('sun', 'assets/sprites/sun.png');
    this.load.image('background', 'assets/sprites/background.png');
    this.load.image('player1', 'assets/sprites/Player1.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('player2', 'assets/sprites/Player2.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('enemy', 'assets/sprites/enemy.png');
    this.load.image('tree_normal', 'assets/sprites/tree_normal.png');
    this.load.image('platform', 'assets/sprites/Platform.png');
}

function create() {
    // Agregar imágenes al juego
    this.add.image(0, 0, 'sky').setOrigin(0, 0).setScale(2);
    this.add.image(0, 243, 'background').setOrigin(0, 0).setScale(2);
    this.add.image(750, -9, 'cloudMini').setOrigin(0, 0).setScale(2);
    this.add.image(570, 50, 'cloudMini').setOrigin(0, 0).setScale(2);
    this.add.image(620, 250, 'cloudMini').setOrigin(0, 0).setScale(2);
    this.add.image(500, 150, 'cloudMini').setOrigin(0, 0).setScale(2);
    this.add.image(100, 80, 'cloudMedium').setOrigin(0, 0).setScale(2);
    this.add.image(300, -10, 'cloudMedium').setOrigin(0, 0).setScale(2);
    this.add.image(-40, -40, 'cloudMedium').setOrigin(0, 0).setScale(2);
    this.add.image(650, 50, 'sun').setOrigin(0, 0).setScale(2);

    // Crear grupo para los árboles
    this.treesGroup = this.physics.add.group();

    // Crear jugadores
    this.player1 = new Player1(this, 0, 400, 'player1');
    this.player2 = new Player2(this, 0, 400, 'player2');

    // Crear enemigo
    this.enemy = new Enemy(this, 0, 600, 'enemy');

    // Crear plataformas
    platforms = [
        new Platforms(this, 766, 450, 'platform'),
        new Platforms(this, 50, 450, 'platform'),
        new Platforms(this, 250, 350, 'platform'),
        new Platforms(this, 650, 350, 'platform'),
        new Platforms(this, 100, 250, 'platform'),
        new Platforms(this, 450, 250, 'platform')
    ];

    // Lógica para crear 10 árboles al comienzo del juego
    for (let i = 0; i < 10; i++) {
        let x = Phaser.Math.Between(0, game.config.width);
        let y = game.config.height - 16;
        let tree = this.treesGroup.create(x, y, 'tree_normal');
        tree.setBounce(0.2);
        tree.setCollideWorldBounds(true);
        tree.setInteractive();
    }
    
    // Habilita colisiones entre jugadores y plataformas
    this.physics.add.collider([this.player1, this.player2], platforms);

    // Agrega un texto para mostrar las vidas en la esquina superior izquierda
    this.livesText = this.add.text(16, 16, 'Vidas: ' + config.lives, { fontSize: '32px', fill: '#ff0000', fontWeight: 'bold' });
}

function update() {
    // Lógica de actualización del juego
    this.player1.update();
    this.player2.update();

    this.treesGroup.children.iterate((tree) => {
        tree.update();
    });

    this.enemy.update();

    // Verificar colisiones con las plataformas
    for (const platform of platforms) {
        if (this.physics.world.overlap(this.player1, platform.suelo)) {
            platform.handlePlayerInteraction(this.player1);
        }

        if (this.physics.world.overlap(this.player2, platform.suelo)) {
            platform.handlePlayerInteraction(this.player2);
        }
    }

    // Reducir una vida si un jugador colisiona con el enemigo
    if (this.physics.world.overlap(this.player1, this.enemy)) {
        config.lives -= 1;
        this.livesText.setText('Vidas: ' + config.lives);

        this.player1.setPosition(0, 400);

        if (config.lives === 0) {
            this.scene.restart();
        }
    }
    
    if (this.physics.world.overlap(this.player2, this.enemy)) {
        config.lives -= 1;
        this.livesText.setText('Vidas: ' + config.lives);
    
        this.player2.setPosition(200, 400);
        
        if (config.lives === 0) {
            this.scene.restart();
        }
    }
}