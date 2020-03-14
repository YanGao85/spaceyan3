import logo from '../../assets/images/logo.png';
import background from '../../assets/images/nebula1.png';
import enemy1 from '../../assets/images/Enemy1.png';
import enemy2 from '../../assets/images/Enemy2.png';
import enemy3 from '../../assets/images/Enemy3.png';
import enemy4 from '../../assets/images/Enemy4.png';
import hero from '../../assets/images/HeroShip.png';
import beam from '../../assets/images/Beam.png';
import explosion from '../../assets/images/explosion.png';
// import font from '../../assets/fonts/metal.png';
// import fontxml from '../../assets/fonts/metalFontxml.png';
export class Boot extends Phaser.Scene {
	constructor() {
		super('boot');
	}
	preload() {
		this.load.image('logo', logo);
		this.load.image('background', background);
		this.load.image('hero', hero);
		this.load.spritesheet('beam', beam, {
			frameWidth: 40,
			frameHeight: 60
		});
		this.load.image('enemy1', enemy1);
		this.load.image('enemy2', enemy2);
		this.load.image('enemy3', enemy3);
		this.load.image('enemy4', enemy4);
		this.load.spritesheet('explosion', explosion, {
			frameWidth: 16,
			frameHeight: 16
		});
		// this.load.bitmapFont('pixelFont', font);
	}
	create() {
		this.anims.create({
			key: 'beam_anim',
			frames: this.anims.generateFrameNumbers('beam'),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'explode',
			frames: this.anims.generateFrameNumbers('explosion'),
			frameRate: 10,
			repeat: 0,
			hideOnComplete: true
		});
		this.scene.start('preloader');
	}
}
