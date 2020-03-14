export default class Beam extends Phaser.GameObjects.Sprite {
	constructor(scene) {
		const x = scene.hero.x;
		const y = scene.hero.y;
		super(scene, x, y, 'beam');
		scene.add.existing(this);
		this.play('beam_anim');
		scene.physics.world.enableBody(this);
		this.body.velocity.x = +300;
		scene.projectiles.add(this);
	}
	update() {
		if (this.x < 12) {
			this.destroy();
		}
	}
}
