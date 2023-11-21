// Configuración del juego
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }, // Configura la gravedad en el eje Y
            debug: false // Desactiva la visualización de información de depuración
        }
    },
    scene: {
        preload: preload, // Función de precarga
        create: create, // Función de creación
        update: update // Función de actualización
    },
    backgroundColor: '#87CEEB' // Establece el color de fondo
};

let game = new Phaser.Game(config);

function preload() {
    // Cargar imágenes
    this.load.image('player', 'assets/sprites/PlayerRight.png'); // Carga la imagen del jugador
    this.load.image('tree_normal', 'assets/sprites/tree_normal.png'); // Carga la imagen del árbol
    this.load.image('platform', 'assets/sprites/Platform.png'); // Carga la imagen de la plataforma
}

function create() {
    // Crear grupo para los árboles
    this.treesGroup = this.physics.add.group(); // Crea un grupo para los árboles en la escena

    // Crear jugadores
    this.player1 = new Player1(this, 100, 450); // Crea el jugador 1 en la posición especificada
    this.player2 = new Player2(this, 200, 450); // Crea el jugador 2 en la posición especificada

    // Crear plataforma derecha
    this.platformRight = new PlatformRight(this, 766, 450, 'platform'); // Crea la plataforma en la posición especificada

    // Crear suelo invisible debajo de la plataforma derecha
    const ground = this.physics.add.staticGroup(); // Crea un grupo estático para el suelo
    ground.create(766, 450, 'platform').setScale(2).refreshBody();  // Ajusta la escala del suelo según sea necesario

    // Lógica para crear 10 árboles al comienzo del juego
    for (let i = 0; i < 10; i++) {
        let x = Phaser.Math.Between(0, game.config.width); // Genera una posición X aleatoria
        let y = game.config.height - 16; // Calcula la posición Y para colocar el árbol en la parte superior de la pantalla
        // Agregar árboles directamente al grupo
        let tree = this.treesGroup.create(x, y, 'tree_normal'); // Crea un árbol en la posición especificada
        tree.setBounce(0.2); // Establece el rebote del árbol
        tree.setCollideWorldBounds(true); // Hace que el árbol colisione con los límites del mundo
        tree.setInteractive(); // Habilita la interacción con el árbol
    }
}

function update() {
    // Lógica de actualización del juego
    this.player1.update(); // Actualiza el jugador 1
    this.player2.update(); // Actualiza el jugador 2

    // Lógica de actualización de los árboles
    this.treesGroup.children.iterate((tree) => {
        tree.update(); // Actualiza cada árbol en el grupo
    });
    
    // Verificar si Player1 está en la plataforma
    if (this.physics.world.overlap(this.player1, this.platformRight.suelo)) {
        this.platformRight.handlePlayerInteraction(this.player1); // Maneja la interacción del jugador 1 con la plataforma
    }
}