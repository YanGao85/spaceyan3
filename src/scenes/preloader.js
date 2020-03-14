import backgroundpng1 from '../../assets/images/shadow-of-the-beast2-karamoon.png';

export class Preloader extends Phaser.Scene {
	constructor() {
		super('preloader');
	}
	preload() {
		this.load.image('background', 'assets/backgrounds/nebula1.png');
		this.load.image('hero', 'assets/sprites/HeroShip.png');
		this.load.spritesheet('beam', 'assets/sprites/Beam.png', {
			frameWidth: 40,
			frameHeight: 60
		});
		this.load.image('enemy1', 'assets/sprites/Enemy1.png');
		this.load.image('enemy2', 'assets/sprites/Enemy2.png');
		this.load.image('enemy3', 'assets/sprites/Enemy3.png');
		this.load.image('enemy4', 'assets/sprites/Enemy4.png');
		this.load.spritesheet('explosion', 'assets/sprites/explosion.png', {
			frameWidth: 16,
			frameHeight: 16
		});
		this.load.bitmapFont('pixelFont', 'assets/fonts/font.png', 'assets/fonts/font.xml');
		this.load.audio('audio_beam', [ 'assets/sounds/beam.ogg' ]);
		this.load.audio('audio_explosion', [ 'assets/sounds/explosion.ogg' ]);

		this.load.audio('music', [ 'assets/sounds/music.ogg' ]);
		// console.log("Preloader preload")
		// let ready = false;
		// let progressBar = this.add.graphics();
		// let progressBox = this.add.graphics();
		// progressBox.fillStyle(0x222222, 0.8);
		// progressBox.fillRect(240, 270, 320, 50);

		// var width = this.cameras.main.width;
		// var height = this.cameras.main.height;
		// var loadingText = this.make.text({
		// 	x: width / 2,
		// 	y: height / 2 - 50,
		// 	text: 'Loading...',
		// 	style: {
		// 		font: '20px monospace',
		// 		fill: '#ffffff'
		// 	}
		// });
		// loadingText.setOrigin(0.5, 0.5);

		// var percentText = this.make.text({
		// 	x: width / 2,
		// 	y: height / 2 - 5,
		// 	text: '0%',
		// 	style: {
		// 		font: '18px monospace',
		// 		fill: '#ffffff'
		// 	}
		// });
		// percentText.setOrigin(0.5, 0.5);

		// var assetText = this.make.text({
		// 	x: width / 2,
		// 	y: height / 2 + 50,
		// 	text: '',
		// 	style: {
		// 		font: '18px monospace',
		// 		fill: '#ffffff'
		// 	}
		// });
		// assetText.setOrigin(0.5, 0.5);

		// this.load.on('progress', function(value) {
		// 	console.log(value);
		// 	percentText.setText(parseInt(value * 100) + '%');
		// 	progressBar.clear();
		// 	progressBar.fillStyle(0xffffff, 1);
		// 	progressBar.fillRect(250, 280, 300 * value, 30);
		// });
		// this.load.on('fileprogress', function(file) {
		// 	console.log(file.src);
		// 	assetText.setText('Loading asset: ' + file.key);
		// });
		// this.load.on('complete', function() {
		// 	console.log('complete');
		// 	progressBar.destroy();
		// 	progressBox.destroy();
		// 	loadingText.destroy();
		// 	percentText.destroy();
		// 	assetText.destroy();
		// 	ready = 'true';
		// 	console.log('on Complete should be one time');
		// 	console.log(ready);
		// });

		// //-------------mainMenu-------------//
		// this.load.image('BkGrnd', backgroundpng1);

		// //-------------Lvl_1-------------//
	}
	create() {
		//Create animationsthis.add.text(20, 20, 'Loading game...');
		// setTimeout(() => {
		// 	this.scene.start('playGame');
		// }, 1000);
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
		this.scene.start('mainMenu');
	}
}
