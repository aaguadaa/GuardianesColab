// Clase Player2 para el jugador que usa las teclas A, D, W
class Player2 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
        this.cursors = { left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A), right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D), up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W), down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S) };
        this.actionKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
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
            this.setVelocityY(-330);
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