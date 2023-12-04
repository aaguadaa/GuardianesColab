// Clase Player2 para el jugador que usa las flechas
class Player1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, imageKey) {
        super(scene, x, y, imageKey);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.actionKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.jumpVelocity = -330;
    }

    update() {
        this.handleMovement();
        this.checkTreeInteraction();
    }

    handleMovement() {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(160);
        } else {
            this.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.body.blocked.down) {
            console.log("Salto"); // Añadido para verificar si se activa el salto
            this.setVelocityY(this.jumpVelocity);
        }
    }

    checkTreeInteraction() {
        if (this.actionKey.isDown) {
            this.plantTree();
        }
    }

    plantTree() {
        const x = this.x;
        const y = this.y - 16;
        const newTree = this.scene.treesGroup.create(x, y, 'tree_normal');
        newTree.setBounce(0.2);
        newTree.setCollideWorldBounds(true);
        newTree.setInteractive();
    }
}