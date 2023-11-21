// Tree.js
class Tree {
    constructor(scene, x, y, type) {
        this.scene = scene;
        this.type = type; // Puede ser 'normal' o 'indestructible'
        this.health = 3; // Vida inicial del árbol
        this.sprite = scene.physics.add.sprite(x, y, `tree_${type}`); // Puedes tener imágenes distintas para cada tipo
    }
    /*
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
    }*/
}

export default Tree;