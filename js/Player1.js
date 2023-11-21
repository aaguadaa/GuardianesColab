// Clase Player1 para el jugador que usa las flechas
class Player1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, imageKey) {
        super(scene, x, y, imageKey); // Ahora el constructor acepta un parámetro para la imagen
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
        this.cursors = scene.input.keyboard.createCursorKeys(); // Configura las teclas de flecha
        this.actionKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); // Configura la tecla de acción (ENTER)
    }

    update() {
        this.handleMovement(); // Maneja el movimiento del jugador
        this.checkTreeInteraction(); // Verifica la interacción del jugador con los árboles
    }

    handleMovement() {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-160); // Mueve al jugador hacia la izquierda
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(160); // Mueve al jugador hacia la derecha
        } else {
            this.setVelocityX(0); // Detiene la velocidad en el eje X si no se presiona ninguna tecla
        }

        if (this.cursors.up.isDown && this.body.blocked.down) {
            this.setVelocityY(-330); // Aplica velocidad hacia arriba (salto) si el jugador está en el suelo
        }
    }

    checkTreeInteraction() {
        if (this.actionKey.isDown) {
            this.plantTree(); // Llama al método para plantar un árbol si se presiona la tecla de acción
        }
    }

    plantTree() {
        const x = this.x; // Obtiene la posición X del jugador
        const y = this.y - 16; // Calcula la posición Y para colocar el nuevo árbol justo encima del jugador
        const newTree = this.scene.treesGroup.create(x, y, 'tree_normal'); // Crea un nuevo árbol en la escena
        newTree.setBounce(0.2); // Establece el rebote del árbol
        newTree.setCollideWorldBounds(true); // Hace que el árbol colisione con los límites del mundo
        newTree.setInteractive(); // Habilita la interacción con el árbol
    }
}