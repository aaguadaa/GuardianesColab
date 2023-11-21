// Clase Player2 para el jugador que usa las teclas A, D, W
class Player2 extends Phaser.Physics.Arcade.Sprite {
    // Constructor de la clase con parámetros: scene (escena), x (posición x), y (posición y), imageKey (clave de la imagen)
    constructor(scene, x, y, imageKey) {
        // Llama al constructor de la clase padre (Phaser.Physics.Arcade.Sprite) con los parámetros proporcionados
        super(scene, x, y, imageKey);

        // Agrega la instancia del jugador a la escena
        scene.add.existing(this);

        // Habilita la física para la instancia del jugador y la agrega al sistema de física de la escena
        scene.physics.add.existing(this);

        // Establece el rebote del jugador
        this.setBounce(0.2);

        // Hace que el jugador colisione con los límites del mundo
        this.setCollideWorldBounds(true);

        // Crea el objeto 'cursors' para manejar las teclas de movimiento
        this.cursors = {
            left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        };

        // Crea el objeto 'actionKey' para manejar la tecla de acción (espacio en este caso)
        this.actionKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    // Método de actualización que se llama en cada fotograma
    update() {
        this.handleMovement(); // Maneja el movimiento del jugador
        this.checkTreeInteraction(); // Verifica la interacción del jugador con los árboles
    }

    // Método para manejar el movimiento del jugador
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

    // Método para verificar la interacción del jugador con los árboles
    checkTreeInteraction() {
        if (this.actionKey.isDown) {
            this.plantTree(); // Llama al método para plantar un árbol si se presiona la tecla de acción
        }
    }

    // Método para plantar un árbol
    plantTree() {
        const x = this.x; // Obtiene la posición X del jugador
        const y = this.y - 16; // Calcula la posición Y para colocar el nuevo árbol justo encima del jugador
        const newTree = this.scene.treesGroup.create(x, y, 'tree_normal'); // Crea un nuevo árbol en la escena
        newTree.setBounce(0.2); // Establece el rebote del árbol
        newTree.setCollideWorldBounds(true); // Hace que el árbol colisione con los límites del mundo
        newTree.setInteractive(); // Habilita la interacción con el árbol
    }
}