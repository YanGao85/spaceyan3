import logo from '../../assets/images/logo.png';

export class Boot extends Phaser.Scene {
	constructor() {
		super('boot');
	}
	preload() {
		this.load.image('logo', logo);
	}
	create() {
		this.scene.start('preloader');
	}
}
