// Clase PlatformRight
class PlatformRight extends Phaser.Physics.Arcade.Sprite {
    // Constructor de la clase PlatformRight
    constructor(scene, x, y, key) {
        // Llama al constructor de la clase base (Phaser.Physics.Arcade.Sprite)
        super(scene, x, y, key);

        // Añade la plataforma a la escena
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Configuración de las propiedades de la plataforma
        this.setImmovable(true); // Hace que la plataforma no se mueva al colisionar
        this.body.allowGravity = false; // Evita que la plataforma sea afectada por la gravedad
        this.body.gravity.y = 0; // Establece la gravedad en cero para la plataforma
        this.body.checkCollision.none = true; // Evita colisiones con otros objetos

        // Configuración del suelo de la plataforma
        this.suelo = scene.physics.add.staticGroup();
        this.createSuelo();

        // Habilitar interacción con los jugadores
        this.setInteractive();
        scene.input.setDraggable(this);

        // Manejar eventos de arrastre para mover la plataforma
        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            this.x = dragX;
            this.suelo.getChildren()[0].x = dragX;
        });
    }

    // Método para crear el suelo de la plataforma
    createSuelo() {
        const { x, y, height } = this.getBounds();
        this.suelo.create(x, y + height / 2, 'platform').setScale(2).refreshBody();
    }

    // Método para manejar la interacción con los jugadores
    handlePlayerInteraction(player) {
        if (player.body.touching.down) {
            player.setVelocityY(0); // Detener la velocidad en el eje Y
            player.setY(this.suelo.getChildren()[0].y - this.height - player.height / 2);
        }
    }
}

// ... (resto del código, si lo hubiera)
