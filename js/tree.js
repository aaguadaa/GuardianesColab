// Tree.js
class Tree extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, `tree_${type}`);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.type = type;
        this.health = 3;
    }

    update() {
        // Lógica de actualización del árbol
        if (this.health <= 0) {
            this.destroy();
        }
    }

    destroy() {
        // Lógica para destruir el árbol
        this.scene.treesGroup.remove(this.sprite); // Eliminar el árbol del grupo
        this.sprite.destroy(); // Eliminar el sprite del árbol
    }

    takeDamage() {
        // Lógica para hacer que el árbol tome daño
        this.health--;
    }
}

export default Tree;