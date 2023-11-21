// Clase para el manejo del enemigo
class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        // Posición inicial a la izquierda de la pantalla
        super(scene, -50, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Configuración de las propiedades del enemigo
        this.setCollideWorldBounds(true);
        this.setVelocityX(100); // Velocidad inicial hacia la derecha

        // Contador de árboles atacados
        this.attackedTrees = 0;

        // Habilitar interacción con árboles
        this.setInteractive();

        // Manejar la interacción con árboles
        scene.input.on('gameobjectdown', (pointer, gameObject) => {
            if (gameObject === this) {
                this.attackTree();
            }
        });
    }

    attackTree() {
        if (this.attackedTrees < 3) {
            // Lógica de ataque al árbol (puedes restar vida al árbol, etc.)
            // Por ahora, simplemente destruimos el árbol
            const tree = this.scene.treesGroup.getFirstAlive();
            if (tree) {
                tree.destroy();
                this.attackedTrees++;

                // Si se han atacado tres árboles, destruir al enemigo
                if (this.attackedTrees === 3) {
                    this.destroy();
                }
            }
        }
    }

    update() {
        // Verificar si el enemigo ha alcanzado el límite derecho o izquierdo
        if (this.x >= this.scene.physics.world.bounds.width - this.width / 2) {
            this.setVelocityX(-100); // Cambiar la dirección a izquierda
        } else if (this.x <= this.width / 2) {
            this.setVelocityX(100); // Cambiar la dirección a derecha
        }
    }
}